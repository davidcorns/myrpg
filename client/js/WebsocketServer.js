function WebsocketServer() {
	this.commands = [];
}	//end WebsocketServer




WebsocketServer.prototype.init = function(url, onopen) {
	this.url = url;
	var conn = new WebSocket(this.url);

	conn.onopen = onopen;
	var commands = this.commands;

	conn.onmessage = function(e) {
		var msg = e.data;
		var i = msg.indexOf(' ');
		var cmd = msg.substr(0, i);
		if(commands.hasOwnProperty(cmd)) {
			var data = msg.substr(i+1);
			//console.log('recieved command: ' + cmd + ': ' + data);
			commands[cmd](data);
		} else {
			console.log('unkown command: ' + cmd);
		}
	}

	this.conn = conn;
}


WebsocketServer.prototype.send = function(msg) {
	this.conn.send(msg);
}


WebsocketServer.prototype.on = function(cmdStr, cmdFunc) {
	this.commands[cmdStr] = cmdFunc;	
}



/*
	conn.onopen = function() {
		conn.send("hello world");
	}

		var div = document.createElement("textarea");
	conn.onmessage = function(e) {
		div.textContent = e.data;
		document.body.appendChild(div);
	}
*/


function WebsocketServer() {

	var commands = [];




}	//end Server


WebsocketServer.instance = null;


//singleton
WebsocketServer.getInstance = function() {
	if(WebsocketServer.instance == null) {
		WebsocketServer.instance = new WebsocketServer();
	}

	return WebsocketServer.instance;
}


WebsocketServer.prototype.init = function(url, onopen) {
	this.url = url;
	var conn = new WebSocket(this.url);

	conn.onopen = onopen;

	conn.onmessage = function(e) {
		
	}

	this.conn = conn;
}


WebsocketServer.prototype.send = function(msg) {
	this.conn.send(msg);
}


WebsocketServer.prototype.on = function(cmdStr, cmdFunc) {
	commands[cmdStr] = cmdFunc;	
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


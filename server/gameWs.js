//logger 
var mylog = require('mylog');
var log = mylog.getLogger(__filename);

//web socket server
var ws = require('nodejs-websocket');

var gameWs = {
createServer: function(game) {
	return ws.createServer(function (conn) {
		log.debug('new websocket connection: %s', conn);

		conn.on('text', function (str) {
			log.debug('websocket received: %s', str)
			for(var i=0; i<10000; i++) {
				conn.sendText(str.toUpperCase()+': ' + i);
			}
		});

		conn.on('close', function (code, reason) {
			log.debug('websocket connection closed, reason: %s, code: %s', code, reason);
		});

	});
}
};


module.exports = gameWs;


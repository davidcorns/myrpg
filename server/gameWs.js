//logger 
var mylog = require('mylog');
var log = mylog.getLogger(__filename);

//web socket server
var ws = require('nodejs-websocket');

var gameWs = {

me: { id: 0, x: 0, y: 0 },

commands: {
	'login': function(conn, id) {
		player = gameWs.me;
		conn.sendText('login ' + player.id);
		conn.sendText('create ' + player.id + ' player 32 48');
			
	},

	'left': function(conn, args) {
		gameWs.me.x -= 1;
	},
	'right': function(conn, args) {
		gameWs.me.x += 1;
	},
	'up': function(conn, args) {
		gameWs.me.y -= 1;
	},
	'down': function(conn, args) {
		gameWs.me.y += 1;
	}
},

createServer: function(game) {

	return ws.createServer(function (conn) {
		log.debug('new websocket connection' );

		var loop = setInterval(function() {
			var player = gameWs.me;
			conn.sendText('move ' + player.id + ' ' + player.x  + ' ' + player.y);
		}, 200);

		conn.on('text', function (msg) {
			log.debug('websocket received: %s', msg);
			var i = msg.indexOf(' ');
			var cmd = msg;
			if(i>0) cmd = msg.substr(0, i);
			var data = msg.substr(i+1);
			if(gameWs.commands.hasOwnProperty(cmd)) {
				gameWs.commands[cmd](conn, data);
			}
			else {
				log.warn('unkown command: %s', cmd);
			}
		});

		conn.on('close', function (code, reason) {
			log.debug('websocket connection closed, reason: %s, code: %s', code, reason);
			clearInterval(loop);
		});



	});
}

};


module.exports = gameWs;


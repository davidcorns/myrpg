game.initWsEvent = function() {
	var websocket = this.websocket;


	websocket.on('create', function(msg) {
		var ary = msg.split(' ');
		console.log('create game entity' + ary[0]);
		game.createEntity(ary[0], ary[1], ary[2]);
	});

	websocket.on('move', function(msg) {
		var ary = msg.split(' ');
		game.moveEntity(ary[0], ary[1], ary[2]);
	});

	websocket.on('login', function(msg) {
		game.player_id = msg;	
	});

}



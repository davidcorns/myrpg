game.initEvent = function() {
	var websocket = this.websocket;

	websocket.on('login', function(msg) {
		console.log('i am login');
	});

	websocket.on('create', function(msg) {
		var ary = msg.split(' ');
		game.createObject(ary[0], ary[1], ary[2]);
	});

}


Crafty.scene("loading", function() {
	
	var restUrl = "http://localhost:8081";

	console.log('start init restful server-side communication');
	var restful = RestfulServer.getInstance();
	restful.init(restUrl);
	console.log('rest service url = ' + restful.url);

	console.log('start init websocket server-side communication');
	var websocket = WebsocketServer.getInstance();
	restful.send('/config/websocket', function(res) {
		websocket.init(res.url, function() {
			websocket.send("login {username: david}");
		});
		console.log('websocket service url = ' + websocket.url);
	});

	restful.send('/config/canvas', function(canvasConfig) {
		console.log('init canvas with width='+canvasConfig.width+' and height='+canvasConfig.height);
		Crafty.init(canvasConfig.width, canvasConfig.height);
		Crafty.canvas.init();
	});

/*
	Crafty.sprite(32, 48, "res/event1.png", {
		player: [0, 0]
	});

		
	Crafty.sprite(32, 32, "res/autotile1.png", {
		grass1: [0, 0],
		grass2: [0, 1],
		grass3: [0, 2],
		grass4: [1, 0, 3, 3]
	});
*/


});

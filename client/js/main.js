window.onload = function() {
	loadingResources('http://localhost:8081', function() {
		console.log('int game event handlers');

		//ask for the websocket url 
		game.restful.send('/config/websocket', function(res) {
			console.log('start init websocket server-side communication');
			initWebsocket(res.url);
		});

		//main game loop
		game.mainLoop(12);

	});
}


function loadingResources(restfulUrl, callback) {

	console.log('start init restful server-side communication: ' + restfulUrl);
	game.restful.init(restfulUrl);

	game.restful.send('/config/canvas', function(canvas) {

		game.init(canvas.w, canvas.h);

		//call postLoading callback once all async functions are finished
		//reference: http://stackoverflow.com/questions/18008479/node-js-wait-for-multiple-async-calls
		var finished = _.after(2, callback);

		//ask for the animation spirte asynchronously
		game.restful.send('/resources/sprite', function(sprites) {
			console.log("load sprites: %o", sprites);
			game.pushSprites(sprites, finished);
		});

		//ask for the animation spirte asynchronously
		game.restful.send('/resources/animation', function(animations) {
			console.log("load animations: %o", animations);
			game.pushAnimations(animations, finished);
		});

	});

}


function initWebsocket(url) {
	console.log('websocket service url = ' + url);
	game.websocket.init(url, function() {
		game.initWsEvent();
		game.websocket.send("login david");
	});
}

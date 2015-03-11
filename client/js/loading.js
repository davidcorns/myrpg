/*	public function for this javascript file	*/
//------------------------------------------------------------

game.loading = function(restfulUrl, postLoading) {
	
	var restful = this.restful;
	initRestful(restful, restfulUrl);

	restful.send('/config', function(config) {
		initWebSocket(this.websocket, config.websocket_url);

		var c = config.canvas;
		this.initScene(c.w, c.h);

		//call postLoading callback once all async functions are finished
		//reference: http://stackoverflow.com/questions/18008479/node-js-wait-for-multiple-async-calls
		var finished = _.after(2, postLoading);
		asyncLoadSprites(ds, restful, finished);
		asyncLoadAnimation(ds, restful, finished);

	});


}

/*	initialization functions */
//------------------------------------------------------------
function initRestful(restful, url) {
	console.log('start init restful server-side communication');
	restful.init(url);
	console.log('rest service url = ' + restful.url);
	return restful;
}


function initWebsocket(websocket, url) {
	console.log('start init websocket server-side communication');

	//ask for the websocket url 
	websocket.init(url, function() {
		websocket.send("login {username: david}");
	});
	console.log('websocket service url = ' + url);

	return websocket;
}




/*	asynchronous functions	*/
//------------------------------------------------------------

//ask for the animation spirte asynchronously
function asyncLoadSprites(ds, restful, finished) {
	var scene = ds.scene;

	restful.send('/resources/sprite', function(sprites) {
		var imageUrls = grepImageUrls(sprites);

		scene.loadImages(imageUrls, function() {
			for(key in sprites) { 
				var sp = sprites[key];
				ds.pushSprite(s, sp.url, sp.w, sp.h);
			}
			finished();
		});
	});
}



//ask for the animation spirte asynchronously
function asyncLoadAnimation(ds, restful, finished) {

	restful.send('/resources/animation', function(animations) {
		for(a in animations) {
			var an = animations[a];
			ds.pushAnimation(a, an);
		}
		finished();	
	});
}


/*	util functions	*/
//------------------------------------------------------------
function grepImageUrls(sprites) {
	var urls = [];
	for(s in sprites) {
		var url = sprites[s].url;
		urls.push(url);
	}

	return urls;
}




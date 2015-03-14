
function Game() {
	//private variables
	var scene = null;
	var sprites = {};
	var animations = {};
	var entities = {};

	//public variables
	this.restful = new RestfulServer();
	this.websocket = new WebsocketServer();


/*	initialization functions */
//------------------------------------------------------------
this.init = function(w, h) {
	console.log('init canvas with width='+w+' and height='+h);
	scene = sjs.Scene({"w": w, "h": h});

}


/*	main loop	*/
//------------------------------------------------------------
this.mainLoop = function(fps) {
	var websocket = game.websocket;
	var option = {tickDuration: 1000/fps};
	var ticker = scene.Ticker(function(t, option) {
		var input  = scene.Input();	
		if(input.keyboard.d) {
			websocket.send('right');
		}
		else if(input.keyboard.a) {
			websocket.send('left');
		}
		else if(input.keyboard.w) {
			websocket.send('up');
		}
		else if(input.keyboard.s) {
			websocket.send('down');
		}

		for(e in entities) {
			entities[e].update();
		}
	});

	ticker.run();
}



/*	inner class */
//------------------------------------------------------------



/*	datastructure related functions */
//------------------------------------------------------------

//sprite : key: {url, w, h}
this.pushSprites = function(isprites, callback) {
	var urls = grepImageUrls(isprites);
	scene.loadImages(urls, function() {
		merge(sprites, isprites);
		callback();
	});
}


this.pushAnimations = function(ianim, callback) {
	merge(animations, ianim);
	callback();
}

this.createEntity = function(id, sid, w, h) {
	var s = sprites[sid];
	var sp = scene.Sprite(s.url);
	sp.size(s.w, s.h);	
	
	sp.active = false;
	entities[id] = sp;
}

this.moveEntity = function(id, x, y) {

	var sp = entities[id];
	x = parseInt(x) + scene.w/2;
	y = parseInt(y) + scene.h/2;

	if(sp.active === false) {
		sp.active = true;
		sp.move(x, y);
		return ;
	}

	sp.move(x - sp.x, y - sp.y);
}

}	//end Game


/*	util functions	*/
//------------------------------------------------------------
function merge(target, src) {
	for(k in src) {
		target[k] = src[k];
	}
}


function grepImageUrls(sprites) {
	var urls = [];
	for(s in sprites) {
		urls.push(sprites[s].url);
	}

	return urls;
}

function dump(obj) {
	console.log("dump: %o", obj)
}

//------------------------------------------------------------
var game = new Game();





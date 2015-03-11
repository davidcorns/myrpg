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
function initScene(w, h) {
	console.log('init canvas with width='+c.w+' and height='+c.h);
	scene = sjs.Scene({"w": w, "h": h});
}


/*	inner class */
//------------------------------------------------------------
var Sprite = function() {
	function Sprite(url, w, h) {
		this.url = url;
		this.w = w;
		this.h = h;
	}
}



/*	datastructure related functions */
//------------------------------------------------------------

function pushSprite(key, url, w, h) {
	console.log("loading image: " + url);
	sprites[key] = new Sprite(url, w, h);
}

function pushAnimation(key, cycle) {
	console.log("loading animation: " + key);
	animations[key] = cycle;
}

function createEntity(name, sprite, w, h) {
	var s = sprites[key];
	var sp = scene.Sprite(s.url);
	sp.size(s.w, s.h);	
}

}	//end Game

var game = new Game();





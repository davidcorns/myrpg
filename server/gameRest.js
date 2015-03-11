var express = require( 'express' ); //Web framework
var util = require('util');
var fs = require('fs');

var mylog = require('mylog');
var log = mylog.getLogger(__filename);


//------------------------------------------------------------

/*	Create and configure server	*/
var app = express();
var allowCrossDomain = require('./allowCrossDomain.js');
app.use(allowCrossDomain);



app.get('/config', function(request, response) {
	var url = 'ws://localhost:8082';
	var canvas = {w: 800, h: 600};
	response.send({"websocket_url": url, "canvas": canvas});
});


/*
app.get( '/resources/sprite', function( request, response ) {
	var host = request.get('host');
	host = resolveLocal(host);

	var SPRITE_RESOURCES = 'resources/sprite/';
	host = host + SPRITE_RESOURCES;

	fs.readdir(SPRITE_RESOURCES, function(err,files){
		if(err) throw err;

		var result = {};
		files.forEach(function(file){
			result[file] = host + file;
		});
		response.send(result);
	});

});
*/
app.get( '/resources/sprite', function( request, response ) {
	//var host = request.get('host');
	//host = resolveLocal(host) + '/resources/sprite/';
	var host = 'resources/sprite/';

	//mock result
	var result = {
		player: {url:host+"player.png", w:32, h:48}
	};
	response.send(result);

});


app.get( '/resources/animation', function( request, response ) {
	//mock result
	var result = {
		walk_down: [[0, 0, 5], [32, 0, 5], [64, 0, 5], [96, 0, 5]],
		walk_left: [[0, 48, 5], [32, 48, 5], [64, 48, 5], [96, 48, 5]],
		walk_right: [[0, 96, 5], [32, 96, 5], [64, 96, 5], [96, 96, 5]],
		walk_up: [[0, 144, 5], [32, 144, 5], [64, 144, 5], [96, 144, 5]]
	};

	response.send(result);

});



module.exports = {
	createServer: function() {
		return app;
	}
}



/*	util function	*/
//------------------------------------------------------------
function resolveLocal(hostname) {
	function uplevel(str) {
		var n = str.lastIndexOf('/');
		return str.substr(0, n);
	}

	function startsWith(str, sub_str) {
		return str.lastIndexOf(sub_str, 0) === 0;
	}

	var localdir = 'file://' + uplevel(__dirname);
	if(startsWith(hostname, 'localhost')) return localdir;
	if(startsWith(hostname, '127.0.0.1')) return localdir;

	return "http://" + hostname;
}


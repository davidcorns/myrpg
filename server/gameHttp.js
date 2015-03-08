//logger
var mylog = require('mylog');
var log = mylog.getLogger(__filename);

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');


//game http server for static game client
var http = require('http');

var gameHttp = {
createServer: function(contentPath) {
	var serve = serveStatic(contentPath);

	var server = http.createServer(function(req, res){
		var done = finalhandler(req, res)
		serve(req, res, done)
	});

	return server;
}
}

module.exports = gameHttp;


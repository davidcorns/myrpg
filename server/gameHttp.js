//logger
var express = require('express');
var mylog = require('mylog');
var log = mylog.getLogger(__filename);


//game http server for static game client
var app = express();


module.exports =  {
	createServer: function(contentPath) {
		app.use(express.static(contentPath));
		return app;
	}
}

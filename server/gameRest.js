var express = require( 'express' ); //Web framework
var allowCrossDomain = require('./allowCrossDomain.js');

/*	Create and configure server	*/
var app = express();
app.use(allowCrossDomain);

app.get( '/resources/sprite', function( request, response ) {
		
});


app.get('/config/websocket', function(request, response) {
	var url = 'ws://localhost:8082';
	response.send({"url": url});
});


app.get('/config/canvas', function(request, response) {
	var canvas = {width: 800, height: 600};
	response.send(canvas);
});

module.exports = {
	createServer: function() {
		return app;
	}
}


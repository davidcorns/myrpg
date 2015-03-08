//setup the logger
var mylog = require('mylog');
mylog.setup('debug');
var log = mylog.getLogger(__filename);


//setup the game
log.info("main game logic start");
var game;


//http server is for the html5 client side
log.info("http server start");
var http = require('./server/gameHttp.js');
var httpServer = http.createServer('./client');
httpServer.listen(8080);


//restful server is for the game resources
log.info("restful server start");
var rest = require('./server/gameRest.js');
var restServer = rest.createServer();
restServer.listen(8081);


//websocket server is for the runtime game communication
log.info("websocket server start");
var ws = require('./server/gameWs.js');
var wsServer = ws.createServer(game);
wsServer.listen(8082);


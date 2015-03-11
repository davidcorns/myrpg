window.onload = function() {

	game.initEvent();

	game.loading('http://localhost:8081', function() {
		console.log('finish loading!');
	});
}

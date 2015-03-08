window.onload = function() {

	var conn = new WebSocket("ws://" + window.location.hostname + ":8081");

	conn.onopen = function() {
		conn.send("hello world");
	}


	Crafty.init(800, 640);
	Crafty.canvas.init();


	Crafty.sprite(32, 48, "res/event1.png", {
		player: [0, 0]
	});

		
	Crafty.sprite(32, 32, "res/autotile1.png", {
		grass1: [0, 0],
		grass2: [0, 1],
		grass3: [0, 2],
		grass4: [1, 0, 3, 3]
	});

	


	Crafty.scene("main", function() {
		//generate world
		for(var i=0; i<25; i++) {
			for(var j=0; j<20; j++) {
				
				var g = Crafty.math.randomInt(2, 3);
				Crafty.e("2D, Canvas, grass"+g)
					.attr({x: i*32, y: j*32, z: 0});
			}
		}


		// Create our player entity with some premade components
		var player = Crafty.e("2D, DOM, SpriteAnimation, player")
			.attr({x: 160, y: 144, z: 1})
			.reel('playerDown', 1000, 0, 0, 4)
			.reel('playerLeft', 1000, 0, 1, 4)
			.reel('playerRight', 1000, 0, 2, 4)
			.reel('playerUp', 1000, 0, 3, 4);

		player.animate('playerLeft', -1);


	});


	//automatically play the loading scene
	Crafty.scene("loading");

	
};



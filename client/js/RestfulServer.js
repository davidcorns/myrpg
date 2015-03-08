function RestfulServer() {
	
};


RestfulServer.instance = null;


//singleton
RestfulServer.getInstance = function() {
	if(RestfulServer.instance == null) {
		RestfulServer.instance = new RestfulServer();
	}

	return RestfulServer.instance;
}


RestfulServer.prototype.init = function(url) {
	this.url = url;	
}


RestfulServer.prototype.send = function(path, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", this.url + path, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState != 4) return;
		if (xmlhttp.status != 200) {
			console.log("fail get " + this.url + path);
			return;
		}
		
		var json = JSON.parse(xmlhttp.responseText);
		callback(json);	
		}

}


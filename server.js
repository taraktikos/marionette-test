var http = require("http");
var url = require("url");
var formidable = require("formidable");

var static = require('node-static');

var file = new static.Server('./public');

exports.start = function(route, handle) {
	http.createServer(function(request, response) {
        request.addListener('end', function () {
			file.serve(request, response);
	    }).resume();
		var pathname = url.parse(request.url).pathname;
		route(request, response, handle, pathname);

	}).listen(3000, function() {
		console.log('Server listening on port 3000');
	});
}
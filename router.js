exports.route = function(request, response, handle, pathname) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
    	handle[pathname](request, response);
    } else {
    	// console.log("No request handler for " + pathname);
    	// response.writeHead(404, {"Content-Type": "text/plain"});
	    // response.write("404 Not found");
	    // response.end();
    }
};
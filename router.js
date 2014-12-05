exports.route = function(request, response, handle, pathname) {
    console.log("About to route a request for " + pathname);
    var urlArr = pathname.split("/");
    console.log(request.method);
    if (urlArr[1] == "contacts") {
    	if (urlArr[2] != undefined) {
			var name = "/" + urlArr[1] + "/:id";
			console.log(name);
	    	handle[name](request, response, urlArr[2]);
    	} else {
			handle[pathname](request, response);
		}
    } else if (typeof handle[pathname] === 'function') {
    	handle[pathname](request, response);
    } else {
    	// console.log("No request handler for " + pathname);
    	// response.writeHead(404, {"Content-Type": "text/plain"});
	    // response.write("404 Not found");
	    // response.end();
    }
};
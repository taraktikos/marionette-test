var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
//handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/contacts"] = requestHandlers.contacts;
handle["/contacts/:id"] = requestHandlers.contact;

server.start(router.route, handle);
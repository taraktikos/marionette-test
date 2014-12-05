var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(request, response) {
	console.log("Request handler 'start' was called.");

  	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(request, response) {
    console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");

		/* Возможна ошибка в Windows: попытка переименования уже существующего файла */
		fs.rename(files.upload.path, "/tmp/test.png", function(err) {
		  if (err) {
			fs.unlink("/tmp/test.png");
			fs.rename(files.upload.path, "/tmp/test.png");
		  }
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function contacts(request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify([
          {
            id: 1,
              firstName: "Bob",
              lastName: "test",
              phoneNumber: "44 44 44"
          },
          {
            id: 2,
              firstName: "Aob2",
              lastName: "test2",
              phoneNumber: "442 44 44"
          }
        ]));
  response.end();
}

function contact(request, response, id) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  if (request.method == "GET") {
    response.write(JSON.stringify({
              id: 2,
              firstName: "Bob",
              lastName: "test",
              phoneNumber: "44 44 44"
          }));
  } else if (request.method == "DELETE") {
    response.write(JSON.stringify({
              id: 2,
              status: "success"
          }));
  }
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.contacts = contacts;
exports.contact = contact;
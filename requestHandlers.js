var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
    mysql      = require('mysql'),
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database: 'book'
    });
connection.connect();

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
    if (request.method == "GET") {
        connection.query('SELECT * FROM book', function (err, rows, fields) {
            if (err) throw err;
            var result = [];
            rows.forEach(function (value, key) {
                result.push(value);
            });

            response.write(JSON.stringify(result));
            response.end();
        });
    } else if (request.method == "POST") {
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields) {
            connection.query('INSERT INTO book (firstName, lastName, phoneNumber) VALUES ("' + fields.firstName + '", "' + fields.lastName + '", "' + fields.phoneNumber + '")', function(err, rows) {
                if (err) throw err;
                fields.id = rows.insertId;
                response.write(JSON.stringify(fields));
                response.end();
            });
        });
    }
}

function contact(request, response, id) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  if (request.method == "GET") {
      connection.query('SELECT * FROM book WHERE id = ' + id, function(err, rows) {
          if (err) throw err;
          if (rows[0] != undefined) {
              response.write(JSON.stringify(rows[0]));
          } else {
              response.write("404");
          }
          response.end();
      });
  } else if (request.method == "DELETE") {
      connection.query('DELETE FROM book WHERE id = ' + id, function(err, rows) {
          if (err) throw err;
          response.write(JSON.stringify({
              id: id,
              status: "success"
          }));
          response.end();
      });

  } else if (request.method == "PUT") {
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields) {
        connection.query('UPDATE book SET firstName = "' + fields.firstName + '", lastName = "' + fields.lastName + '", phoneNumber = "' + fields.phoneNumber + '" WHERE id = ' + id, function(err, rows) {
            if (err) throw err;
            response.write(JSON.stringify(fields));
            response.end();
        });
    });
  }
  
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.contacts = contacts;
exports.contact = contact;
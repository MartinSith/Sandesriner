(function () {
  var fs, https, mimetypes, options, path, server;

  fs = require("fs"); // file system
  https = require("https"); // creates an https server
  path = require("path"); // used for working with url paths

  mimetypes = {
    css: "text/css",
    html: "text/html",
    ico: "image/ico",
    jpg: "image/jpeg",
    js: "text/javascript",
    json: "application/json",
    png: "image/png",
  };

  /*options = {
      pfx: fs.readFileSync("ssl/crt.pfx"),
      passphrase: "password"
    };*/

  options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  };

  server = https.createServer(options, function (request, response) {
    if (request.url == "" || request.url == "/") {
      request.url = "index.html";
    }

    fs.readFile(__dirname + "/" + request.url, function (error, content) {
      if (error) {
        // if there is an error reading the requested url
        console.log("Error: " + error); // output it to the console
      } else {
        // else, there is no error, write the file contents to the page
        response.writeHead(200, {
          "Content-Type": mimetypes[path.extname(request.url).split(".")[1]],
        });
        response.write(content); // write that content to our response object
      }

      response.end(); // This will send our response object to the browser
    });
  });

  server.listen("8000", function () {
    console.log("Server started!");
  });
})();

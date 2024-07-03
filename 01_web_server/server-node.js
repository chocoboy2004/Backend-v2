const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("JavaScript Backend");
  } else if (req.url == "/login") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Its a login page")
  } else if (req.url == "/signup") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Its a signup page")
  } else {
    res.statusCode = 404
    res.setHeader("Content-Type", "text/plain")
    res.end("404 Not found")
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});

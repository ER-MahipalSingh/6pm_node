const http = require("http");

const server = http.createServer((req, res) => {
  res.write("<h1>Hello, Server is starting... <h1/>");
  res.end();
});

server.listen(8000, () => {
  console.log("Server started....");
});

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const osc = require("./osc-plugin");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("btnPressed", function(msg) {
    console.log("message: " + msg);
    osc.playLoop(13);
  });
});

http.listen(8000, function() {
  console.log("listening on *:8000");
});

const PORT = process.env.PORT || 8000;

const WebSocket = require("ws");
const osc = require("./osc-plugin");

const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", socket => {
  socket.on("message", message => {
    console.log("Received:", message);
    const trigger = '{"hello": "world"}';
    if (message === JSON.parse(trigger).hello) {
      osc.playLoop({ control: "/1/push1", value: 1 });
    }
  });

  socket.send(`Listening on localhost on port ${PORT}`);
});

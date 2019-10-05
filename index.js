const PORT = process.env.PORT || 8000;

const WebSocket = require("ws");
const oscClient = require("./osc-client");

const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", socket => {
  socket.on("message", message => {
    console.log("Received:", message);
    const trigger = '{"hello": "world"}';
    if (message === JSON.parse(trigger).hello) {
      oscClient.playLoop({ control: "/1/push1", value: 1 });
    }
  });

  socket.send(`Listening on localhost on port ${PORT}`);
});

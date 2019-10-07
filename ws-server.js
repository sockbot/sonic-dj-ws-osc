const PORT = process.env.PORT || 8000;

const WebSocket = require("ws");
const oscConnection = require("./osc-plugin");

const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", socket => {
  console.log(
    "OSC CONNECTION:",
    oscConnection.osc.eventHandler.addressHandlers["/beat"].callback
  );
  socket.on("message", message => {
    console.log("Received:", message);
    if (message === "start") {
      oscConnection.playLoop({ control: "/1/push1", value: 1 });
      console.log("start");
    }
    if (message === "stop") {
      oscConnection.playLoop({ control: "/1/push1", value: 0 });
      console.log("stop");
    }
  });
  socket.send(`Listening on localhost on port ${PORT}`);
});

module.exports = { wss };

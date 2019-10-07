const OSC = require("osc-js");
const express = require("express");
const app = express();
const port = 8080;

const options = {
  receiver: "ws",
  udpServer: {
    host: "localhost",
    port: 14560,
    exclusive: false
  },
  udpClient: {
    host: "localhost",
    port: 4559
  },
  wsServer: {
    host: "localhost",
    port: 8000
  }
};

const plugin = new OSC.BridgePlugin(options);

const osc = new OSC({ plugin: plugin });

osc.open();

const control = "/1/push13";
const value = 1;

// const message = new OSC.Message(control, value);

osc.on("/beat", message => {
  // const [beat, bar, phrase] = message.args;
  // const loop = { control: "/1/push11", value: 1 };
  // if (beat === 0) {
  //   // playLoop(loop);
  //   console.log("beat === 0");
  // }
  // wssServer.wss.on("connection", socket => {
  //   socket.send("beat", message.args);
  // });
  // console.log("beat", message.args);
  // osc.send(new OSC.Message("/test", `${message.args}`)); // this sends binary data to a ws client
});

osc.on("/bar", message => {
  console.log("bar", message);
});

osc.on("/phrase", message => {
  console.log("phrase", message);
});

osc.on("/test/random", message => {
  console.log("Random:", message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.static("public"));

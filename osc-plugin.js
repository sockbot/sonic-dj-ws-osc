const SONIC_PI_PORT = 4559;
const SONIC_PI_HOST = "localhost";

const OSC = require("osc-js");

const config = {
  send: {
    host: SONIC_PI_HOST, // @param {string} Hostname of udp client for messaging
    port: SONIC_PI_PORT // @param {number} Port of udp client for messaging
  },
  open: {
    host: "localhost",
    port: 14560
  }
};

const plugin = new OSC.DatagramPlugin(config);

const osc = new OSC({
  plugin: plugin
});

const buttons = {
  1: "/1/push1",
  2: "/1/push2",
  3: "/1/push3",
  4: "//push4",
  5: "/1/push5",
  6: "/1/push6",
  7: "/1/push7",
  8: "/1/push8",
  9: "/1/push9",
  10: "/1/push10",
  11: "/1/push11",
  12: "/1/push12",
  13: "/1/push13",
  14: "/1/push14",
  15: "/1/push15",
  16: "/1/push16"
};

const stagedPhrase = {
  lead: null,
  bass: null,
  drum: null,
  rise: null
};

const playLoop = loopNum => {
  console.log("PLAYING ", buttons[loopNum]);
  const message = new OSC.Message(buttons[loopNum], 1);
  osc.send(message);
};

const playPhrase = loopNums => {
  const { lead, bass, drum, rise } = loopNums;
  playLoop(lead);
  playLoop(bass);
  playLoop(drum);
  playLoop(rise);
};

osc.on("/beat", message => {
  // console.log("beat", message.args);
});

osc.on("/bar", message => {
  console.log("bar", message.args);
});

osc.on("/phrase", message => {
  // playPhrase(stagedPhrase);
  console.log("phrase", message.args);
});

osc.open();

module.exports = { playLoop };

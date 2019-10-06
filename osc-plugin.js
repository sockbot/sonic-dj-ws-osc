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

const playLoop = options => {
  // e.g. { control: "/1/push1", value: 1 },
  const { control, value } = options;
  const message = new OSC.Message(control, value);
  osc.send(message);
};

const playPhrase = options => {};

osc.on("/beat", message => {
  const [beat, bar, phrase] = message.args;
  const loop = { control: "/1/push11", value: 1 };
  if (beat === 0) {
    // playLoop(loop);
    console.log("beat === 0");
  }
  console.log(message);
});

osc.open();

// playLoop({ control: "/1/push1", value: 1 });

module.exports = { playLoop };

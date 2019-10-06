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

osc.on("/beat", message => {
  console.log(message.args);
});

osc.open();

// playLoop({ control: "/1/push1", value: 1 });

module.exports = { playPhrase, playLoop };

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
  silly_lead: "/1/push1",
  flanged_lead: "/1/push2",
  electro_lead: "/1/push3",
  dub_bass: "/1/push4",
  echo_bass: "/1/push5",
  simple_bass: "/1/push6",
  groovy_drum: "/1/push7",
  amen_drum: "/1/push8",
  basic_drum: "/1/push9",
  sanre_rise: "/1/push10",
  second_rise: "/1/push11",
  third_rise: "/1/push12",
  shoryuken_sample: "/1/push13",
  airhorn_sample: "/1/push14",
  siren_sample: "/1/push15",
  laser_sample: "/1/push16"
};

let stage = {};

let socket = null;

const grabSocket = sock => {
  if (sock !== undefined) {
    socket = sock;
  }
  return socket;
};

const clearStage = () => {
  stage = {
    loops: {
      lead: null,
      bass: null,
      drum: null,
      rise: null
    },
    sample: null
  };
};
clearStage();

const setStage = instruments => {
  stage = { ...instruments };
};

const playLoop = loopKey => {
  console.log(`PLAYING LOOP ${loopKey} ` + buttons[loopKey]);
  const message = new OSC.Message(buttons[loopKey], 1);
  osc.send(message);
};

const playPhrase = instruments => {
  const loops = instruments.loops;
  console.log("PLAY PHRASE:", loops);
  for (const loop in loops) {
    if (loops[loop] !== null) {
      playLoop(loops[loop]);
    }
  }
};

osc.on("/beat", message => {
  // console.log("beat", message.args);
});

osc.on("/bar", message => {
  console.log("bar", message.args);
  if (grabSocket()) {
    grabSocket().emit("bar", message.args[1]);
  }
});

osc.on("/phrase", message => {
  if (grabSocket()) {
    grabSocket().emit("phrase", message.args[2]);
  }
  console.log("phrase", message.args);
  playPhrase(stage);
  clearStage();
});

osc.open();

module.exports = { grabSocket, setStage, playLoop };

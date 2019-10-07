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
  1: "/1/push1", // beep_lead
  2: "/1/push2", // silly_lead
  3: "/1/push3", // flanged_lead
  4: "/1/push4", // industrial_lead
  5: "/1/push5", // electro_lead
  6: "/1/push6", // simple_bass
  7: "/1/push7", // echo_bass
  8: "/1/push8", // dub_bass
  9: "/1/push9", // distort_bass
  10: "/1/push10", // groovy_bass
  11: "/1/push11", // amen_drum
  12: "/1/push12", // basic_drum
  13: "/1/push13", // shoryuken
  14: "/1/push14",
  15: "/1/push15",
  16: "/1/push16"
};

const loops = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

const samples = [0, 0, 0, 0];

let stage = {
  lead: null,
  bass: null,
  drum: null,
  rise: null
};

const setStage = instruments => {
  stage = { ...instruments };
};

const playLoop = loopNum => {
  console.log(`PLAYING LOOP ${loopNum}`, buttons[loopNum]);
  const message = new OSC.Message(buttons[loopNum], 1);
  osc.send(message);
};

const playPhrase = instruments => {
  console.log("PLAY PHRASE:", instruments);
  for (const instrument in instruments) {
    if (instruments[instrument] !== null) {
      playLoop(instruments[instrument]);
    }
  }
};

osc.on("/beat", message => {
  // console.log("beat", message.args);
});

osc.on("/bar", message => {
  console.log("bar", message.args);
});

osc.on("/phrase", message => {
  playPhrase(stage);
  console.log("phrase", message.args);
  setStage({});
});

osc.open();

module.exports = { stage, setStage };

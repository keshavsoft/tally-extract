import dispatchTally from "../dispatchTally/index.js";
// import app, { call } from "../../../src/index.js";

import structure from "./structure.json" with {type: 'json'};

const start = async () => {
  const tdlMessage = structure.tally.masters.units.all.tdl;
  console.log("tdlMessage : ", tdlMessage);
  const data = await dispatchTally({
    inTdlMessage: tdlMessage
  });

  console.log(data);
};

start().then();
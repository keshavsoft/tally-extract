import dispatchTally from "../dispatchTally/index.js";
// import app, { call } from "../../../src/index.js";

import structure from "./structure.json" with {type: 'json'};

const start = async () => {
  const data = await dispatchTally({
    inTdlMessage: structure.tally.company.fetch.tdl
  })
  console.log(data);
};

start().then();
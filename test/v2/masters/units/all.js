import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> Units: all ===");
    const resCall = await call("tally.masters.units.all", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.masters.units.all("mani9");
    console.log("tally.masters.units.all() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

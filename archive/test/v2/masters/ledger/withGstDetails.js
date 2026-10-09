import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> Ledger: withGstDetails ===");
    const resCall = await call("tally.masters.ledger.withGstDetails", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.masters.ledger.withGstDetails("mani9");
    console.log("tally.masters.ledger.withGstDetails() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

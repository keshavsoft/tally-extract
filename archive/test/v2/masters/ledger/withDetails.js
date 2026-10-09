import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> Ledger: withDetails ===");
    const resCall = await call("tally.masters.ledger.withDetails", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.masters.ledger.withDetails("mani9");
    console.log("tally.masters.ledger.withDetails() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

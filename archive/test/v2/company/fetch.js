import tally, { call } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing Company: fetch ===");
    const resCall = await call("tally.company.fetch", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.company.fetch("mani9");
    console.log("tally.company.fetch() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

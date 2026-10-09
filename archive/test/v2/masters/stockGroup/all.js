import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> StockGroup: all ===");
    const resCall = await call("tally.masters.stockGroup.all", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.masters.stockGroup.all("mani9");
    console.log("tally.masters.stockGroup.all() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

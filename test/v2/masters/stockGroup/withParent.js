import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> StockGroup: withParent ===");
    const resCall = await call("tally.masters.stockGroup.withParent", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.masters.stockGroup.withParent("mani9");
    console.log("tally.masters.stockGroup.withParent() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> StockItems: withBatches ===");
    const resCall = await call("tally.masters.stockItems.withBatches", "mani9");
    console.log("call() response received, length:", resCall.length);

    const resTree = await tally.masters.stockItems.withBatches("mani9");
    console.log("tally.masters.stockItems.withBatches() response received, length:", resTree.length);
};

run().catch(console.error);

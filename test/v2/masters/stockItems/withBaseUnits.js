import tally, { call } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing Masters -> StockItems: withBaseUnits ===");
    const resCall = await call("tally.masters.stockItems.withBaseUnits", "mani9");
    console.log("call() response:", resCall.includes("<STATUS>1</STATUS>"));

    const resTree = await tally.masters.stockItems.withBaseUnits("mani9");
    console.log("tally.masters.stockItems.withBaseUnits() response:", resTree.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

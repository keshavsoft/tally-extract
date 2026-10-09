import tally, { call } from "../../src/index.js";

const testWithBatches = async () => {
    console.log("=== Testing Stock Items with Batches ===");

    // 1. Using call function with path and company
    const resCall = await call({
        inPath: "tally.masters.stockItems.withBatches",
        inCompany: "mani9"
    });
    console.log("call() response received, length:", resCall.length);

    // 2. Using autocomplete dot-notation
    const resTree = await tally.masters.stockItems.withBatches("mani9");
    console.log("tally.masters.stockItems.withBatches() response received, length:", resTree.length);
};

testWithBatches().catch(console.error);

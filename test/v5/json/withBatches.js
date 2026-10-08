import { json } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing JSON Layer: Masters -> Stock Items with Batches ===");

    // 1. Direct route call
    const directJson = await json("tally.masters.stockItems.withBatches", "mani9");
    console.log("1. json('tally.masters.stockItems.withBatches') returned object:", typeof directJson === "object");
    const stockItems = directJson?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKITEM;
    console.log("   Stock items count:", Array.isArray(stockItems) ? stockItems.length : 1);
    console.log("   First stock item name:", Array.isArray(stockItems) ? stockItems[0]?.["@_NAME"] : stockItems?.["@_NAME"]);

    // 2. Dot-notation call
    const treeJson = await json.masters.stockItems.withBatches("mani9");
    console.log("2. json.masters.stockItems.withBatches() returned object:", typeof treeJson === "object");
};

run().catch(console.error);

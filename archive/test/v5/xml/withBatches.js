import tally, { xml } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing XML Layer: Masters -> Stock Items with Batches ===");

    // 1. Direct route call
    const directXml = await xml("tally.masters.stockItems.withBatches", "mani9");
    console.log("1. xml('tally.masters.stockItems.withBatches') returned XML string, length:", directXml.length);

    // 2. Dot-notation call
    const treeXml = await tally.masters.stockItems.withBatches("mani9");
    console.log("2. tally.masters.stockItems.withBatches() returned XML string, length:", treeXml.length);
};

run().catch(console.error);

import tally, { xml } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing v6 XML: Masters -> Stock Items with Batches ===");

    const directXml = await xml("tally.masters.stockItems.withBatches", "mani9");
    console.log("1. xml('tally.masters.stockItems.withBatches') length:", directXml.length);

    const treeXml = await tally.masters.stockItems.withBatches("mani9");
    console.log("2. tally.masters.stockItems.withBatches() length:", treeXml.length);
};

run().catch(console.error);

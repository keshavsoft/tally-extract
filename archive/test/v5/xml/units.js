import tally, { xml } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing XML Layer: Masters -> Units ===");

    // 1. Direct route call
    const directXml = await xml("tally.masters.units.all", "mani9");
    console.log("1. xml('tally.masters.units.all') returned XML:", typeof directXml === "string" && directXml.includes("<STATUS>1</STATUS>"));

    // 2. Dot-notation call
    const treeXml = await tally.masters.units.all("mani9");
    console.log("2. tally.masters.units.all() returned XML:", typeof treeXml === "string" && treeXml.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

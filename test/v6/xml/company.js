import tally, { xml } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing v6 XML: Company ===");

    const directXml = await xml("tally.company.fetch", "mani9");
    console.log("1. xml('tally.company.fetch') returned XML:", typeof directXml === "string" && directXml.includes("<STATUS>1</STATUS>"));

    const treeXml = await tally.company.fetch("mani9");
    console.log("2. tally.company.fetch() returned XML:", typeof treeXml === "string" && treeXml.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

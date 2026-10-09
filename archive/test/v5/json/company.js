import { json } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing JSON Layer: Company ===");

    // 1. Direct route call
    const directJson = await json("tally.company.fetch", "mani9");
    console.log("1. json('tally.company.fetch') returned object:", typeof directJson === "object");
    console.log("   Company JSON preview:", JSON.stringify(directJson?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY));

    // 2. Dot-notation call
    const treeJson = await json.company.fetch("mani9");
    console.log("2. json.company.fetch() returned object:", typeof treeJson === "object");
    console.log("   Company name from JSON:", treeJson?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY?.["@_NAME"]);
};

run().catch(console.error);

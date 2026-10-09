import tally, { call, asJson, getJson } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing v3 Company Fetch ===");

    // 1. Raw XML String flavor
    const xmlRes = await call("tally.company.fetch", "mani9");
    console.log("1. call() returned XML:", typeof xmlRes === "string" && xmlRes.includes("<STATUS>1</STATUS>"));

    // 2. Parsed JSON flavor via asJson / getJson function
    const jsonRes = await asJson("tally.company.fetch", "mani9");
    console.log("2. asJson() returned object:", typeof jsonRes === "object");
    console.log("   Company JSON Preview:", JSON.stringify(jsonRes?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY));

    // 3. Dot-notation autocomplete returning XML
    const treeXml = await tally.company.fetch("mani9");
    console.log("3. tally.company.fetch() returned XML:", typeof treeXml === "string" && treeXml.includes("<STATUS>1</STATUS>"));

    // 4. Dot-notation autocomplete returning JSON
    const treeJson = await tally.company.fetch.asJson("mani9");
    console.log("4. tally.company.fetch.asJson() returned object:", typeof treeJson === "object");
    console.log("   Company Name from JSON:", treeJson?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY?.["@_NAME"]);
};

run().catch(console.error);

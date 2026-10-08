import tally, { call, asJson, getJson } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing v4 (v6 Engine) Company Fetch ===");

    // 1. Core XML: call() returns raw XML string
    const xmlRes = await call("tally.company.fetch", "mani9");
    console.log("1. call() returned XML string:", typeof xmlRes === "string" && xmlRes.includes("<STATUS>1</STATUS>"));

    // 2. Consumer JSON: asJson() / getJson() returns parsed object
    const jsonRes = await asJson("tally.company.fetch", "mani9");
    console.log("2. asJson() returned object:", typeof jsonRes === "object");
    console.log("   Company JSON Preview:", JSON.stringify(jsonRes?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY));

    // 3. Tree Core XML: tally.company.fetch() returns raw XML string
    const treeXml = await tally.company.fetch("mani9");
    console.log("3. tally.company.fetch() returned XML string:", typeof treeXml === "string" && treeXml.includes("<STATUS>1</STATUS>"));

    // 4. Tree Consumer JSON: tally.company.fetch.asJson() returns parsed object
    const treeJson = await tally.company.fetch.asJson("mani9");
    console.log("4. tally.company.fetch.asJson() returned object:", typeof treeJson === "object");
    console.log("   Company Name from JSON:", treeJson?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY?.["@_NAME"]);
};

run().catch(console.error);

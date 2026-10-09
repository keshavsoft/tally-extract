import tally, { call, asJson } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing v3 Masters -> Units: all ===");

    // 1. Raw XML flavor
    const xmlRes = await call("tally.masters.units.all", "mani9");
    console.log("1. call() returned XML:", typeof xmlRes === "string" && xmlRes.includes("<STATUS>1</STATUS>"));

    // 2. Parsed JSON flavor via asJson
    const jsonRes = await asJson("tally.masters.units.all", "mani9");
    console.log("2. asJson() returned object:", typeof jsonRes === "object");
    const units = jsonRes?.ENVELOPE?.BODY?.DATA?.COLLECTION?.UNIT;
    console.log("   Units count in JSON:", Array.isArray(units) ? units.length : 1);
    console.log("   First Unit name:", Array.isArray(units) ? units[0]?.["@_NAME"] : units?.["@_NAME"]);

    // 3. Dot-notation returning JSON
    const treeJson = await tally.masters.units.all.asJson("mani9");
    console.log("3. tally.masters.units.all.asJson() returned object:", typeof treeJson === "object");
};

run().catch(console.error);

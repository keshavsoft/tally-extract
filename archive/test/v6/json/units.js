import { json } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing v6 JSON: Masters -> Units ===");

    const directJson = await json("tally.masters.units.all", "mani9");
    console.log("1. json('tally.masters.units.all') returned object:", typeof directJson === "object");
    const units = directJson?.ENVELOPE?.BODY?.DATA?.COLLECTION?.UNIT;
    console.log("   Units count:", Array.isArray(units) ? units.length : 1);
    console.log("   First unit name:", Array.isArray(units) ? units[0]?.["@_NAME"] : units?.["@_NAME"]);

    const treeJson = await json.masters.units.all("mani9");
    console.log("2. json.masters.units.all() returned object:", typeof treeJson === "object");
};

run().catch(console.error);

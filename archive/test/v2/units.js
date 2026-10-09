import tally, { call } from "../../src/index.js";

const testUnits = async () => {
    console.log("=== Testing Units ===");

    // 1. Using call function with path and company
    const resCall = await call({
        inPath: "tally.masters.units.all",
        inCompany: "mani9"
    });
    console.log("call() response status:", resCall);

    // 2. Using autocomplete dot-notation
    const resTree = await tally.masters.units.all("mani9");
    // console.log("tally.masters.units.all() response status:", resTree.includes("<STATUS>1</STATUS>"));
};

testUnits().catch(console.error);

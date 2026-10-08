import tally, { call } from "../../src/index.js";

const testCompany = async () => {
    console.log("=== Testing Company ===");

    // 1. Using call function with path and company
    const resCall = await call({
        inPath: "tally.company.fetch",
        inCompany: "mani9"
    });
    console.log("call() response status:", resCall);

    // 2. Using autocomplete dot-notation
    const resTree = await tally.company.fetch("mani9");
    console.log("tally.company.fetch() response status:", resTree);
};

testCompany().catch(console.error);

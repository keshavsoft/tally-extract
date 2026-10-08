import company, { masters } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v7: masters (2 inputs: path, companyName) ===");

    const res1 = await masters("units.all", "mani9");
    console.log("1. masters('units.all', 'mani9') returned XML:", typeof res1 === "string" && res1.includes("<STATUS>1</STATUS>"));

    const res2 = await masters("tally.masters.units.all", "mani9");
    console.log("2. masters('tally.masters.units.all', 'mani9') returned XML:", typeof res2 === "string" && res2.includes("<STATUS>1</STATUS>"));

    const res3 = await company.masters("stockItems.withBatches", "mani9");
    console.log("3. company.masters('stockItems.withBatches', 'mani9') length:", res3.length);
};

run().catch(console.error);

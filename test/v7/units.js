import { companyFilter } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v7: masters (2 inputs: path, companyName) ===");

    const res1 = await companyFilter("tally.masters.units.all", "mani9");
    console.log("1. masters('units.all', 'mani9') returned XML:", res1);
};

run().catch(console.error);

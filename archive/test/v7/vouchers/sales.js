import { companyAndPeriodFilter } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing v7: masters (2 inputs: path, companyName) ===");

    const res1 = await companyAndPeriodFilter("tally.vouchers.sales.fetch", "mani9", "20260401", "20260401");
    console.log("sales : ", res1);
};

run().catch(console.error);

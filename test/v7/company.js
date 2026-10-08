import company, { company as getCompany } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v7: company (0 inputs) ===");

    const res1 = await company();
    console.log("1. company() returned XML:", typeof res1 === "string" && res1.includes("<STATUS>1</STATUS>"));

    const res2 = await getCompany();
    console.log("2. named company() returned XML:", typeof res2 === "string" && res2.includes("<STATUS>1</STATUS>"));
};

run().catch(console.error);

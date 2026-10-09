import { companyFilter } from "../../../src/index.js";

const run = async () => {
    const res = await companyFilter("tally.company.fetch");

    console.log("tally.company.fetch result length:", res.length);
    console.log("Sample:", res);
};

run().catch(console.error);

import { companyFilter } from "../../src/index.js";

const run = async () => {
    const res1 = await companyFilter("tally.company.fetch", "mani9");
    console.log("1 L:", res1);
};

run().catch(console.error);

import { companyFilter } from "../../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const resBatches = await companyFilter("tally.masters.stockItems.withBatches", inCompany);
    console.log("tally.masters.stockItems.withBatches length:", resBatches);
};

run().catch(console.error);
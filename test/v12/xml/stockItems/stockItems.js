import { companyFilter } from "../../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const resAll = await companyFilter("tally.masters.stockItems.all", inCompany);
    console.log("tally.masters.stockItems.all length:", resAll.length);

    const resBaseUnits = await companyFilter("tally.masters.stockItems.withBaseUnits", inCompany);
    console.log("tally.masters.stockItems.withBaseUnits length:", resBaseUnits.length);

    const resBatches = await companyFilter("tally.masters.stockItems.withBatches", inCompany);
    console.log("tally.masters.stockItems.withBatches length:", resBatches.length);
};

run().catch(console.error);

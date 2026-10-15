import { companyFilter } from "../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const resAll = await companyFilter("tally.masters.ledger.all", inCompany);
    console.log("tally.masters.ledger.all length:", resAll.length);

    const resDetails = await companyFilter("tally.masters.ledger.withDetails", inCompany);
    console.log("tally.masters.ledger.withDetails length:", resDetails.length);
};

run().catch(console.error);

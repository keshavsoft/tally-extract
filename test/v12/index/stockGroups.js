import { companyFilter } from "../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const resAll = await companyFilter("tally.masters.stockGroup.all", inCompany);
    console.log("tally.masters.stockGroup.all length:", resAll.length);

    const resParent = await companyFilter("tally.masters.stockGroup.withParent", inCompany);
    console.log("tally.masters.stockGroup.withParent length:", resParent.length);
};

run().catch(console.error);

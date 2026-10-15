import { companyFilter } from "../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const resAll = await companyFilter("tally.masters.godown.all", inCompany);
    console.log("tally.masters.godown.all length:", resAll.length);

    const resParent = await companyFilter("tally.masters.godown.withParent", inCompany);
    console.log("tally.masters.godown.withParent length:", resParent.length);
};

run().catch(console.error);

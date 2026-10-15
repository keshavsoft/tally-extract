import { companyFilter } from "../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const resAll = await companyFilter("tally.masters.unit.all", inCompany);
    console.log("tally.masters.unit.all length:", resAll.length);

    const resUnitsFetch = await companyFilter("tally.masters.units.fetch", inCompany);
    console.log("tally.masters.units.fetch length:", resUnitsFetch.length);
};

run().catch(console.error);

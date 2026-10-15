import { reports } from "../../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const stockSummary = await reports("tally.reports.stockSummary", inCompany);

    // console.log("stockSummary : ", stockSummary);
};

run().catch(console.error);
import { reports } from "../../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";

    const trialBalance = await reports("tally.reports.trialBalance", inCompany);

    console.log("trialBalance : ", trialBalance);
};

run().catch(console.error);
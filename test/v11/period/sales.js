import { companyAndPeriodFilter } from "../../../src/index.js";

const run = async () => {
    const inCompany = "mani9";
    const inFromDate = "20260401";
    const inToDate = "20260401";

    const res = await companyAndPeriodFilter(
        "tally.vouchers.sales.fetch",
        inCompany,
        inFromDate,
        inToDate
    );

    console.log("tally.vouchers.sales.fetch length:", res.length);
    console.log("Sample:", res.substring(0, 300));
};

run().catch(console.error);

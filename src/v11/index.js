import tallySpec from "tally-spec";
import send from "./send/index.js";
import sendPeriod from "./send/period.js";
import reports from "./send/reports.js";

/**
 * Story: Clean Tally XML Client (v9)
 * 
 * Directly imports tally-spec for TDL definitions.
 * Exposes two clean functions:
 * 1. company(): Fetches company list from Tally. No inputs required (hardcoded route).
 * 2. masters(inPath, inCompany): Fetches masters from Tally given a path and company name.
 */
const companyFilter = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    }

    return await send({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

const companyAndPeriodFilter = async (inPath, inCompany, inFromDate, inToDate) => {
    const localPath = inPath;
    const localCompany = inCompany;
    const localFromDate = inFromDate;
    const localToDate = inToDate;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    }

    return await sendPeriod({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany,
        inFromDate: localFromDate,
        inToDate: localToDate
    });
};

export default companyFilter;
export { companyFilter, companyAndPeriodFilter, reports };

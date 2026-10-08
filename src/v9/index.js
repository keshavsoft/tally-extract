import tallySpec from "tally-spec";
import send from "./send/index.js";

/**
 * Story: Clean Tally XML Client (v9)
 * 
 * Directly imports tally-spec for TDL definitions.
 * Exposes two clean functions:
 * 1. company(): Fetches company list from Tally. No inputs required (hardcoded route).
 * 2. masters(inPath, inCompany): Fetches masters from Tally given a path and company name.
 */
const company = async () => {
    const tdl = tallySpec.source.tally.company.fetch.tdl;
    return await send({ inTdlMessage: tdl });
};

const masters = async (inPath, inCompany) => {
    const localPath = typeof inPath === "object" ? inPath?.inPath : inPath;
    const localCompany = typeof inPath === "object" ? inPath?.inCompany : inCompany;

    const fullPath = localPath.startsWith("tally.")
        ? localPath
        : localPath.startsWith("masters.")
            ? `tally.${localPath}`
            : `tally.masters.${localPath}`;

    const endpoint = fullPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    }

    return await send({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

company.company = company;
company.masters = masters;

export default company;
export { company, masters };

import dispatchTally from "../../../dispatchTally/index.js";
import source from "../source.json" with { type: "json" };
import normalizeInput from "./normalizeInput/index.js";
import resolveEndpoint from "./resolveEndpoint/index.js";

/**
 * Story: Direct Route Execution (call)
 * 
 * 1. Normalize: Handles both positional call(path, company) and object call({ inPath, inCompany }).
 * 2. Resolve: Checks the path directly against source.json to find the matching TDL specification.
 * 3. Dispatch: Sends the TDL query with company name to Tally and returns the raw XML response string.
 */
const startFunc = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    // 1. Normalize inputs
    const { path, company } = normalizeInput({ inPath: localPath, inCompany: localCompany });

    // 2. Resolve endpoint directly from source.json
    const localEndpoint = resolveEndpoint({ inPath: path, inSource: source });

    // 3. Dispatch to Tally
    return await dispatchTally({
        inTdlMessage: localEndpoint.tdl,
        inCompany: company
    });
};

export default startFunc;

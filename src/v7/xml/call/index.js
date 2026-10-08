import dispatchTally from "../../../../dispatchTally/index.js";
import source from "../../source.json" with { type: "json" };
import normalizeInput from "./normalizeInput/index.js";
import resolveEndpoint from "./resolveEndpoint/index.js";

/**
 * Story: The Sole XML Core (call)
 * 
 * 1. Normalizes input arguments.
 * 2. Resolves route against source.json.
 * 3. Sends TDL query via dispatchTally.
 * 4. Returns raw XML string directly.
 */
const startFunc = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    const { path, company } = normalizeInput({ inPath: localPath, inCompany: localCompany });
    const localEndpoint = resolveEndpoint({ inPath: path, inSource: source });

    return await dispatchTally({
        inTdlMessage: localEndpoint.tdl,
        inCompany: company
    });
};

export default startFunc;

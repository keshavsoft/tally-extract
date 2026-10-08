/**
 * Story: Input Normalization
 * 
 * Supports two invocation styles:
 * 1. Two separate arguments: call("tally.company.fetch", "mani9")
 * 2. A single config object: call({ inPath: "tally.company.fetch", inCompany: "mani9" })
 * 
 * Extracts and returns a standardized { path, company } object.
 */
const startFunc = ({ inPath, inCompany }) => {
    const localPath = inPath;
    const localCompany = inCompany;

    if (typeof localPath === "object" && localPath !== null) {
        return {
            path: localPath.inPath ?? localPath.path,
            company: localPath.inCompany ?? localPath.company
        };
    }

    return {
        path: localPath,
        company: localCompany
    };
};

export default startFunc;

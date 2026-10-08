/**
 * Story: Input Normalization
 * 
 * Users may invoke the function in two ways:
 * 1. Two separate arguments: call("tally.company.fetch", "mani9")
 * 2. A single config object: call({ inPath: "tally.company.fetch", inCompany: "mani9" })
 * 
 * This module extracts and normalizes them into a consistent { path, company } shape.
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

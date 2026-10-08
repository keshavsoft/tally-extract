/**
 * Story: Input Normalization
 * 
 * Supports two input styles:
 * 1. Positional arguments: (path, company)
 * 2. Configuration object: { inPath, inCompany }
 * 
 * Returns normalized { path, company }.
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

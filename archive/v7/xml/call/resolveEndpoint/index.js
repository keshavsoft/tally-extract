/**
 * Story: Endpoint Resolution
 * 
 * Verifies that the requested path exists in source.json and contains a valid TDL definition.
 * Supports both "tally.company.fetch" and "company.fetch".
 */
const startFunc = ({ inPath, inSource }) => {
    const localPath = inPath;
    const localSource = inSource;

    if (!localPath || typeof localPath !== "string") {
        throw new Error("A valid path string is required to resolve an endpoint.");
    }

    let endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], localSource);

    if (!endpoint && !localPath.startsWith("tally.")) {
        endpoint = `tally.${localPath}`.split(".").reduce((acc, key) => acc?.[key], localSource);
    }

    if (!endpoint || !endpoint.tdl) {
        throw new Error(`Endpoint "${localPath}" does not exist in source.json or is missing TDL.`);
    }

    return endpoint;
};

export default startFunc;

/**
 * Story: Endpoint Resolution
 * 
 * Verifies that the requested path exists in source.json and contains a valid TDL message.
 * Supports both root-prefixed ("tally.company.fetch") and non-prefixed ("company.fetch") paths.
 */
const startFunc = ({ inPath, inSource }) => {
    const localPath = inPath;
    const localSource = inSource;

    if (!localPath || typeof localPath !== "string") {
        throw new Error("A valid path string is required to resolve an endpoint.");
    }

    // Direct lookup in source.json
    let endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], localSource);

    // If caller omitted the root 'tally' prefix, check tally[path]
    if (!endpoint && !localPath.startsWith("tally.")) {
        endpoint = `tally.${localPath}`.split(".").reduce((acc, key) => acc?.[key], localSource);
    }

    if (!endpoint || !endpoint.tdl) {
        throw new Error(`Endpoint "${localPath}" does not exist in source.json or is missing TDL.`);
    }

    return endpoint;
};

export default startFunc;

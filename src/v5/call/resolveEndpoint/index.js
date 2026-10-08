/**
 * Story: Endpoint Resolution
 * 
 * Takes the requested path (e.g. "tally.company.fetch" or "company.fetch")
 * and directly checks it against source.json.
 * 
 * If the endpoint exists and has a TDL definition, it returns the endpoint spec.
 * Otherwise, it halts early with an informative error.
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

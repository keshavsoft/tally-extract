import dispatchTally from "../../dispatchTally/index.js";
import source from "./source.json" with { type: "json" };
import apiPaths from "./api.json" with { type: "json" };

const getByPath = ({ inObject, inPathString }) => {
    const localObject = inObject;
    const localPathString = inPathString;

    return localPathString.split(".").reduce((acc, key) => acc?.[key], localObject);
};

const call = async (inParams, inCompanyArg) => {
    let localPath;
    let localCompany;

    if (typeof inParams === "object" && inParams !== null) {
        localPath = inParams.inPath ?? inParams.inKey;
        localCompany = inParams.inCompany ?? inParams.inParam;
    } else {
        localPath = inParams;
        localCompany = inCompanyArg;
    }

    if (!localPath) {
        throw new Error("Path is required for call().");
    }

    let endpoint = getByPath({ inObject: source, inPathString: localPath });
    if (!endpoint && !localPath.startsWith("tally.")) {
        endpoint = getByPath({ inObject: source, inPathString: `tally.${localPath}` });
    }

    if (!endpoint) {
        throw new Error(`Endpoint not found for path: "${localPath}"`);
    }

    if (!endpoint.tdl) {
        throw new Error(`Endpoint "${localPath}" does not have a TDL definition.`);
    }

    return await dispatchTally({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

const tally = {};

for (const apiPath of apiPaths) {
    const parts = apiPath.split(".");
    const relativeParts = parts[0] === "tally" ? parts.slice(1) : parts;

    let current = tally;
    for (let i = 0; i < relativeParts.length - 1; i++) {
        const seg = relativeParts[i];
        current[seg] ??= {};
        current = current[seg];
    }
    const leaf = relativeParts[relativeParts.length - 1];
    current[leaf] = (inCompany, ...inArgs) => call(apiPath, inCompany);
}

tally.call = call;
tally.tally = tally;
const app = tally;

export { call, tally, app };
export default tally;

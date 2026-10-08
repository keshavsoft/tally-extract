import dispatchTally from "../../dispatchTally/index.js";
import source from "./source.json" with { type: "json" };
import apiPaths from "./api.json" with { type: "json" };

const getByPath = (inObject, inPathString) => {
    return inPathString.split(".").reduce((acc, key) => acc?.[key], inObject);
};

const call = async (inKey, inParam) => {
    const localKey = typeof inKey === "object" && inKey?.inKey ? inKey.inKey : inKey;
    const localParam = typeof inKey === "object" && inKey?.inParam !== undefined ? inKey.inParam : inParam;

    if (!localKey) {
        throw new Error("Key or tree path is required for call().");
    }

    let endpoint = getByPath(source, localKey);
    if (!endpoint && !localKey.startsWith("tally.")) {
        endpoint = getByPath(source, `tally.${localKey}`);
    }

    if (!endpoint) {
        throw new Error(`Endpoint not found for path: "${localKey}"`);
    }

    if (!endpoint.tdl) {
        throw new Error(`Endpoint "${localKey}" does not have a TDL definition.`);
    }

    return await dispatchTally({
        inTdlMessage: endpoint.tdl,
        inParam: localParam
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
    current[leaf] = (inParam, ...inArgs) => call(apiPath, inParam);
}

tally.call = call;
tally.tally = tally;
const app = tally;

export { call, tally, app };
export default tally;

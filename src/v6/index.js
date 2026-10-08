import source from "./source.json" with { type: "json" };
import call from "./call/index.js";
import asJson from "./asJson/index.js";
import createApiTree from "./apiTree/index.js";
import attachJson from "./attachJson/index.js";

const getJson = asJson;

// 1. Build the pure XML tree (zero knowledge of JSON)
const tree = createApiTree({
    inSource: source,
    inCall: call
});

// 2. Consume XML tree output and attach .asJson / .getJson helpers to leaves
attachJson({ inTree: tree });

// 3. Primary callable client
const tally = (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;
    return call(localPath, localCompany);
};

tally.call = call;
tally.asJson = asJson;
tally.getJson = getJson;
Object.assign(tally, tree);

export default tally;
export { call, asJson, getJson };

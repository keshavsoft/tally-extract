import source from "./source.json" with { type: "json" };
import call from "./call/index.js";
import getJson from "./getJson/index.js";
import createApiTree from "./apiTree/index.js";

const asJson = getJson;

// Build the autocomplete tree directly from source.json
const tree = createApiTree({
    inSource: source,
    inCall: call,
    inGetJson: getJson
});

const tally = (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;
    return call(localPath, localCompany);
};
tally.call = call;
tally.getJson = getJson;
tally.asJson = asJson;
Object.assign(tally, tree);

export default tally;
export { call, getJson, asJson };

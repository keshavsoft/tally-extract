import source from "../source.json" with { type: "json" };
import call from "./call/index.js";
import createApiTree from "./apiTree/index.js";

/**
 * Story: The Pure XML Client (xml)
 * 
 * 100% self-contained core client. Zero knowledge of JSON or third-party parsers.
 * - Callable with route string: xml("tally.company.fetch", "mani9")
 * - Navigable via dot-notation: xml.company.fetch("mani9")
 */
const tree = createApiTree({
    inSource: source,
    inCall: call
});

const xml = (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;
    return call(localPath, localCompany);
};

xml.call = call;
Object.assign(xml, tree);

export default xml;
export { call };

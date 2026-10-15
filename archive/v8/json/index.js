import source from "../source.json" with { type: "json" };
import call from "../call/index.js";
import parse from "./parse/index.js";

const walk = ({ inNode, inPath }) => {
    const localNode = inNode;
    const localPath = inPath;

    if (!localNode || typeof localNode !== "object") {
        return undefined;
    }

    if (localNode.tdl) {
        return async (inCompany) => {
            const localCompany = inCompany;
            const xml = await call({ inPath: localPath, inCompany: localCompany });
            return parse({ inXml: xml });
        };
    }

    const branch = {};
    for (const key in localNode) {
        if (key === "transform" || key === "instructions") continue;
        const child = walk({
            inNode: localNode[key],
            inPath: localPath ? `${localPath}.${key}` : key
        });
        if (child !== undefined) {
            branch[key] = child;
        }
    }
    return branch;
};

const json = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;
    const xml = await call({ inPath: localPath, inCompany: localCompany });
    return parse({ inXml: xml });
};

Object.assign(json, walk({ inNode: source.tally, inPath: "tally" }));

export default json;

import source from "../source.json" with { type: "json" };
import call from "../call/index.js";

const walk = ({ inNode, inPath }) => {
    const localNode = inNode;
    const localPath = inPath;

    if (!localNode || typeof localNode !== "object") {
        return undefined;
    }

    if (localNode.tdl) {
        return (inCompany) => {
            const localCompany = inCompany;
            return call({ inPath: localPath, inCompany: localCompany });
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

const xml = (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;
    return call({ inPath: localPath, inCompany: localCompany });
};

xml.call = call;
Object.assign(xml, walk({ inNode: source.tally, inPath: "tally" }));

export default xml;

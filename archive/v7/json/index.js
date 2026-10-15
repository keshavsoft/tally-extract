import xml from "../xml/index.js";
import parse from "./parse/index.js";

/**
 * Story: The Detachable JSON Client (json)
 * 
 * Wraps the core xml client.
 * Executes the XML query, consumes the raw XML string output, and parses it to JSON.
 * 
 * - Callable with route string: json("tally.company.fetch", "mani9")
 * - Navigable via dot-notation: json.company.fetch("mani9")
 */
const wrapNode = ({ inNode }) => {
    const localNode = inNode;

    if (!localNode || (typeof localNode !== "object" && typeof localNode !== "function")) {
        return localNode;
    }

    let wrapped;
    if (typeof localNode === "function") {
        wrapped = async (inCompany) => {
            const localCompany = inCompany;
            const localXml = await localNode(localCompany);
            return parse({ inXml: localXml });
        };
    } else {
        wrapped = {};
    }

    for (const [key, value] of Object.entries(localNode)) {
        if (key === "call") continue;
        wrapped[key] = wrapNode({ inNode: value });
    }

    return wrapped;
};

// 1. Direct route call: json("tally.company.fetch", "mani9")
const json = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;
    const localXml = await xml(localPath, localCompany);
    return parse({ inXml: localXml });
};

// 2. Tree navigation: json.company.fetch("mani9")
const jsonTree = wrapNode({ inNode: xml });
Object.assign(json, jsonTree);

export default json;

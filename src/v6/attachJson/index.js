import toJson from "../toJson/index.js";

/**
 * Story: JSON Consumer Attachment
 * 
 * Walks an existing XML tree and decorates executable leaf functions with .asJson / .getJson.
 * It directly consumes the XML leaf's output and passes that string through toJson().
 */
const attachToBranch = ({ inBranch }) => {
    const localBranch = inBranch;

    if (!localBranch || typeof localBranch !== "object") {
        return;
    }

    for (const key of Object.keys(localBranch)) {
        const target = localBranch[key];

        if (typeof target === "function") {
            // Leaf: consumes the XML function output and converts to JSON
            target.asJson = async (inCompany) => {
                const localCompany = inCompany;
                const localXml = await target(localCompany);
                return toJson({ inXml: localXml });
            };
            target.getJson = target.asJson;
        } else if (typeof target === "object" && target !== null) {
            attachToBranch({ inBranch: target });
        }
    }
};

const startFunc = ({ inTree }) => {
    const localTree = inTree;
    attachToBranch({ inBranch: localTree });
    return localTree;
};

export default startFunc;

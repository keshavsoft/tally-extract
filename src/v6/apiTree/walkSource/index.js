/**
 * Story: Pure XML Tree Construction
 * 
 * Walks source.json directly as the single source of truth.
 * - Leaf nodes with TDL become callable functions that return raw XML strings via call().
 * - Structural branches become navigation objects.
 * 
 * This module is 100% pure XML. It has zero knowledge of JSON.
 */
const walkNode = ({ inNode, inPathParts, inCall }) => {
    const localNode = inNode;
    const localPathParts = inPathParts;
    const localCall = inCall;

    // 1. Endpoint Leaf Check: If node has TDL, it is an executable endpoint returning XML
    if (localNode && typeof localNode === "object" && localNode.tdl) {
        const fullPath = localPathParts.join(".");

        const endpointFn = (inCompany) => {
            const localCompany = inCompany;
            return localCall(fullPath, localCompany);
        };

        return endpointFn;
    }

    // 2. Structural Branch: Recurse into children
    if (localNode && typeof localNode === "object" && !Array.isArray(localNode)) {
        const branch = {};

        for (const [key, childNode] of Object.entries(localNode)) {
            // Ignore non-route metadata keys if any
            if (key === "transform" || key === "instructions") continue;

            const childResult = walkNode({
                inNode: childNode,
                inPathParts: [...localPathParts, key],
                inCall: localCall
            });

            if (childResult !== undefined) {
                branch[key] = childResult;
            }
        }

        return branch;
    }

    return undefined;
};

const startFunc = ({ inSource, inCall }) => {
    const localSource = inSource;
    const localCall = inCall;

    return walkNode({
        inNode: localSource,
        inPathParts: [],
        inCall: localCall
    });
};

export default startFunc;

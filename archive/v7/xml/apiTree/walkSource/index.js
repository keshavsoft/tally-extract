/**
 * Story: Pure XML Tree Walker
 * 
 * Walks source.json hierarchy. Leaf nodes with TDL become functions returning raw XML strings.
 */
const walkNode = ({ inNode, inPathParts, inCall }) => {
    const localNode = inNode;
    const localPathParts = inPathParts;
    const localCall = inCall;

    if (localNode && typeof localNode === "object" && localNode.tdl) {
        const fullPath = localPathParts.join(".");

        return (inCompany) => {
            const localCompany = inCompany;
            return localCall(fullPath, localCompany);
        };
    }

    if (localNode && typeof localNode === "object" && !Array.isArray(localNode)) {
        const branch = {};

        for (const [key, childNode] of Object.entries(localNode)) {
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

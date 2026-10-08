/**
 * Story: Walking source.json Directly (No apiPaths)
 * 
 * Instead of traversing an external array of string paths, this module walks
 * source.json directly as the single source of truth.
 * 
 * - If a node contains `tdl`, it is an executable endpoint:
 *   We hook an invocation function that calls Tally, and attach .asJson / .getJson helpers.
 * - If a node contains nested properties, it is a structural branch:
 *   We recurse down into its children to build the navigation hierarchy.
 */
const walkNode = ({ inNode, inPathParts, inCall, inGetJson }) => {
    const localNode = inNode;
    const localPathParts = inPathParts;
    const localCall = inCall;
    const localGetJson = inGetJson;

    // 1. Endpoint Leaf Check: If it has TDL, it is an executable endpoint
    if (localNode && typeof localNode === "object" && localNode.tdl) {
        const fullPath = localPathParts.join(".");

        // Callable function returning raw XML
        const endpointFn = (inCompany) => {
            const localCompany = inCompany;
            return localCall(fullPath, localCompany);
        };

        // Sub-methods returning parsed JSON
        endpointFn.asJson = (inCompany) => {
            const localCompany = inCompany;
            return localGetJson(fullPath, localCompany);
        };
        endpointFn.getJson = (inCompany) => {
            const localCompany = inCompany;
            return localGetJson(fullPath, localCompany);
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
                inCall: localCall,
                inGetJson: localGetJson
            });

            if (childResult !== undefined) {
                branch[key] = childResult;
            }
        }

        return branch;
    }

    return undefined;
};

const startFunc = ({ inSource, inCall, inGetJson }) => {
    const localSource = inSource;
    const localCall = inCall;
    const localGetJson = inGetJson;

    return walkNode({
        inNode: localSource,
        inPathParts: [],
        inCall: localCall,
        inGetJson: localGetJson
    });
};

export default startFunc;

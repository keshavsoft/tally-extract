import walkSource from "./walkSource/index.js";

/**
 * Story: Dynamic API Tree Construction from source.json
 * 
 * 1. Takes source.json directly as the single source of truth.
 * 2. Traverses the hierarchy to find all executable endpoints with TDL definitions.
 * 3. Builds a clean dot-notation tree where each endpoint can be invoked for raw XML
 *    or with .asJson / .getJson for parsed JSON objects.
 */
const startFunc = ({ inSource, inCall, inGetJson }) => {
    const localSource = inSource;
    const localCall = inCall;
    const localGetJson = inGetJson;

    const fullTree = walkSource({
        inSource: localSource,
        inCall: localCall,
        inGetJson: localGetJson
    });

    // The root in source.json is "tally".
    // We expose both:
    // 1. Direct access: tree.company.fetch(...)
    // 2. Full namespace: tree.tally.company.fetch(...)
    const rootTree = fullTree?.tally ? { ...fullTree.tally } : { ...fullTree };

    if (fullTree?.tally) {
        rootTree.tally = fullTree.tally;
    }

    return rootTree;
};

export default startFunc;

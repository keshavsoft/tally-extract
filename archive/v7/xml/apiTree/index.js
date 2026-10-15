import walkSource from "./walkSource/index.js";

/**
 * Story: Pure XML Tree Assembly
 * 
 * Exposes direct access (tree.company.fetch) and full namespace (tree.tally.company.fetch).
 */
const startFunc = ({ inSource, inCall }) => {
    const localSource = inSource;
    const localCall = inCall;

    const fullTree = walkSource({
        inSource: localSource,
        inCall: localCall
    });

    const rootTree = fullTree?.tally ? { ...fullTree.tally } : { ...fullTree };

    if (fullTree?.tally) {
        rootTree.tally = fullTree.tally;
    }

    return rootTree;
};

export default startFunc;

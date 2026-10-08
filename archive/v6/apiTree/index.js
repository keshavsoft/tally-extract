import walkSource from "./walkSource/index.js";

/**
 * Story: API Tree Builder
 * 
 * Builds a clean dot-notation tree from source.json for raw XML queries.
 * Exposes both direct access (tree.company.fetch) and full namespace (tree.tally.company.fetch).
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

import apiPaths from "../api.json" with { type: "json" };
import splitPath from "./splitPath/index.js";
import ensureBranch from "./ensureBranch/index.js";
import attachLeaf from "./attachLeaf/index.js";

const startFunc = ({ inCall }) => {
    const localCall = inCall;
    const tree = {};

    for (const apiPath of apiPaths) {
        const { branches, leaf } = splitPath({ inPath: apiPath });
        const target = ensureBranch({ inTree: tree, inBranches: branches });

        attachLeaf({
            inTarget: target,
            inLeaf: leaf,
            inPath: apiPath,
            inCall: localCall
        });
    }

    return tree;
};

export default startFunc;

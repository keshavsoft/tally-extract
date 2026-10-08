const startFunc = ({ inTree, inBranches }) => {
    const localTree = inTree;
    const localBranches = inBranches;

    let current = localTree;
    for (const branch of localBranches) {
        current[branch] ??= {};
        current = current[branch];
    }

    return current;
};

export default startFunc;

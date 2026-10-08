const startFunc = ({ inPath }) => {
    const localPath = inPath;
    const parts = localPath.split(".");
    const relativeParts = parts[0] === "tally" ? parts.slice(1) : parts;
    const leaf = relativeParts[relativeParts.length - 1];
    const branches = relativeParts.slice(0, -1);

    return {
        branches,
        leaf
    };
};

export default startFunc;

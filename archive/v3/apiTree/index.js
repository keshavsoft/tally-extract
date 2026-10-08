import apiPaths from "../api.json" with { type: "json" };

const startFunc = ({ inCall }) => {
    const localCall = inCall;
    const tree = {};

    for (const apiPath of apiPaths) {
        const parts = apiPath.split(".");
        const relativeParts = parts[0] === "tally" ? parts.slice(1) : parts;

        let current = tree;
        for (let i = 0; i < relativeParts.length - 1; i++) {
            const seg = relativeParts[i];
            current[seg] ??= {};
            current = current[seg];
        }
        const leaf = relativeParts[relativeParts.length - 1];
        current[leaf] = (inCompany, ...inArgs) => localCall({ inPath: apiPath, inCompany });
    }

    return tree;
};

export default startFunc;

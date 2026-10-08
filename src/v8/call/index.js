import dispatchTally from "../../../dispatchTally/index.js";
import source from "../source.json" with { type: "json" };

const startFunc = async ({ inPath, inCompany }) => {
    const localPath = inPath;
    const localCompany = inCompany;

    const path = localPath.startsWith("tally.") ? localPath : `tally.${localPath}`;
    const endpoint = path.split(".").reduce((acc, key) => acc[key], source);

    return await dispatchTally({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

export default startFunc;

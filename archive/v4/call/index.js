import dispatchTally from "../../../dispatchTally/index.js";
import source from "../source.json" with { type: "json" };

const startFunc = async (inPath, inCompany) => {
    const localPath = typeof inPath === "object" ? inPath.inPath : inPath;
    const localCompany = typeof inPath === "object" ? inPath.inCompany : inCompany;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], source);

    return await dispatchTally({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

export default startFunc;

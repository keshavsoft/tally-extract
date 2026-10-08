import dispatchTally from "../../../dispatchTally/index.js";
import source from "../source.json" with { type: "json" };

const getByPath = ({ inObject, inPathString }) => {
    const localObject = inObject;
    const localPathString = inPathString;

    return localPathString.split(".").reduce((acc, key) => acc?.[key], localObject);
};

const startFunc = async (inParams, inCompanyArg) => {
    let localPath;
    let localCompany;

    if (typeof inParams === "object" && inParams !== null) {
        localPath = inParams.inPath ?? inParams.inKey;
        localCompany = inParams.inCompany ?? inParams.inParam;
    } else {
        localPath = inParams;
        localCompany = inCompanyArg;
    }

    if (!localPath) {
        throw new Error("Path is required for call().");
    }

    let endpoint = getByPath({ inObject: source, inPathString: localPath });
    if (!endpoint && !localPath.startsWith("tally.")) {
        endpoint = getByPath({ inObject: source, inPathString: `tally.${localPath}` });
    }

    if (!endpoint) {
        throw new Error(`Endpoint not found for path: "${localPath}"`);
    }

    if (!endpoint.tdl) {
        throw new Error(`Endpoint "${localPath}" does not have a TDL definition.`);
    }

    return await dispatchTally({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

export default startFunc;

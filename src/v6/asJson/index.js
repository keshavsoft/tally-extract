import call from "../call/index.js";
import toJson from "../toJson/index.js";

/**
 * Story: JSON Consumer (asJson / getJson)
 * 
 * Consumes the raw XML string produced by the core call() engine
 * and converts that output into a clean JSON object.
 */
const startFunc = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    // 1. Core XML engine produces raw XML string
    const localXml = await call(localPath, localCompany);

    // 2. Consume output and transform to JSON
    return toJson({ inXml: localXml });
};

export default startFunc;

import { XMLParser } from "fast-xml-parser";
import call from "../call/index.js";

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true
});

/**
 * Story: Fetch & Parse to JSON (getJson / asJson)
 * 
 * 1. Executes the requested path via call() to obtain the raw XML from Tally.
 * 2. Parses the XML string into a clean JavaScript object using fast-xml-parser.
 * 3. Returns the resulting JSON data structure directly.
 */
const startFunc = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    const localRawXml = await call(localPath, localCompany);

    if (!localRawXml || typeof localRawXml !== "string") {
        return localRawXml;
    }

    return xmlParser.parse(localRawXml);
};

export default startFunc;

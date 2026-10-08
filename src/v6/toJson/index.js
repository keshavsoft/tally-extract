import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true
});

/**
 * Story: XML to JSON Transformer
 * 
 * Takes a raw XML string returned by the Tally XML core engine
 * and converts it cleanly into a JavaScript object.
 */
const startFunc = ({ inXml }) => {
    const localXml = inXml;

    if (!localXml || typeof localXml !== "string") {
        return localXml;
    }

    return xmlParser.parse(localXml);
};

export default startFunc;

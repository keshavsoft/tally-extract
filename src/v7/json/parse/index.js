import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true
});

/**
 * Story: XML Parser Utility
 * 
 * Takes a raw XML string and returns a parsed JavaScript object.
 */
const startFunc = ({ inXml }) => {
    const localXml = inXml;

    if (!localXml || typeof localXml !== "string") {
        return localXml;
    }

    return xmlParser.parse(localXml);
};

export default startFunc;

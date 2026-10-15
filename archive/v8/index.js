import xml from "./xml/index.js";
import json from "./json/index.js";

const tally = xml;
tally.xml = xml;
tally.json = json;

export default tally;
export { xml, json };

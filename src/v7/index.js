import xml from "./xml/index.js";
import json from "./json/index.js";

/**
 * Story: Tally Extract Client Entry
 * 
 * - Default export: tally (the core XML client)
 * - Named exports: xml (the core XML client), json (the detachable JSON wrapper)
 * - Property access: tally.xml, tally.json
 */
const tally = xml;
tally.xml = xml;
tally.json = json;

export default tally;
export { xml, json };

import { reports } from "../../src/index.js";
import parseXml from "./parseXml.js";

const run = async () => {
    const res1 = await reports();

    const jsonResult = parseXml(res1);
    const elements = jsonResult?.ENVELOPE ?? [];

    const names = Array.isArray(elements.DSPACCNAME)
        ? elements.DSPACCNAME
        : [elements.DSPACCNAME].filter(Boolean);

    const stockInfo = Array.isArray(elements.DSPSTKINFO)
        ? elements.DSPSTKINFO
        : [elements.DSPSTKINFO].filter(Boolean);

    const batches = Array.isArray(elements.SSBATCHNAME)
        ? elements.SSBATCHNAME
        : [elements.SSBATCHNAME].filter(Boolean);

    console.log("Stock names:", names.length);
    console.log("Stock balances:", stockInfo.length);
    console.log("Batch names:", batches.length);

};

run().catch(console.error);

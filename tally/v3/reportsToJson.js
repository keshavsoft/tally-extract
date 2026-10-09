import { reports } from "../../src/index.js";
import parseXml from "./parseXml.js";

const run = async () => {
    const xml = await reports();
    const start = xml.indexOf("<DSPACCNAME>");
    console.log(xml.slice(start, start + 3000));

    const json = parseXml(xml);

    // console.log("Stock names:", json.ENVELOPE.DSPACCNAME.slice(0, 5));
    // console.log("Stock balances:", json.ENVELOPE.DSPSTKINFO.slice(0, 5));
    // console.log("Batch names:", json.ENVELOPE.SSBATCHNAME.slice(0, 5));

    // console.dir({
    //     stockNames: json.ENVELOPE.DSPACCNAME.length,
    //     stockBalances: json.ENVELOPE.DSPSTKINFO.length,
    //     batchNames: json.ENVELOPE.SSBATCHNAME.length,
    //     firstStockName: json.ENVELOPE.DSPACCNAME[0],
    //     firstStockBalance: json.ENVELOPE.DSPSTKINFO[0],
    //     firstBatch: json.ENVELOPE.SSBATCHNAME[0]
    // }, { depth: 5 });

    // console.dir({
    //     firstName: json.ENVELOPE.DSPACCNAME[0],
    //     firstBalance: json.ENVELOPE.DSPSTKINFO[0],
    //     firstBatch: json.ENVELOPE.SSBATCHNAME[0],
    //     secondName: json.ENVELOPE.DSPACCNAME[1],
    //     secondBalance: json.ENVELOPE.DSPSTKINFO[1]
    // }, { depth: 10 });
};

run().catch(console.error);
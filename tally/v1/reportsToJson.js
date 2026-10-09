import { reports } from "../../src/index.js";
import parseXml from "./parseXml.js";

const run = async () => {
    const res1 = await reports();
    // console.log("1 L:", res1);
    // console.log("1 L:", res1.substring(0, 3000));

    // const res1 = await reports();

    const index = res1.indexOf("<SSBATCHNAME>");
    console.log(res1.substring(index - 500, index + 1500));

    // const jsonResult = parseXml(res1);
    // // console.log("jsonResult :", jsonResult);


    // const names = jsonResult?.ENVELOPE?.DSPACCNAME ?? [];
    // const stockInfo = jsonResult?.ENVELOPE?.DSPSTKINFO ?? [];

    // const rows = names.map((item, index) => {
    //     const stock = stockInfo[index]?.DSPSTKCL ?? {};

    //     return {
    //         name: item.DSPDISPNAME,
    //         quantity: stock.DSPCLQTY ?? "",
    //         rate: stock.DSPCLRATE ?? "",
    //         amount: stock.DSPCLAMTA ?? ""
    //     };
    // });

    // console.dir(rows.slice(0, 10), { depth: null });

};

run().catch(console.error);

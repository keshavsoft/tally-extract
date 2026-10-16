import fs from "fs";
import { reports } from "../../../src/index.js";

const run = async () => {
      const inCompany = "mani9";
    const xml = await reports("tally.reports.stockSummary", inCompany);

    const outPath = new URL("./stockSummary.xml", import.meta.url);
    saveToJson({ inData: xml, inFilePath: outPath });
    console.log("reports() raw XML length:", xml);
};


const saveToJson = async ({ inData, inFilePath }) => {
    const localData = inData;
    const localFilePath = inFilePath;

    fs.writeFileSync(
        localFilePath,
        localData
    );
};

run().catch(console.error);

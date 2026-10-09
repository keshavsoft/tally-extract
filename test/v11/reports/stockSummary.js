import { reports } from "../../../src/index.js";

const run = async () => {
    const xml = await reports();
    console.log("reports() raw XML length:", xml.length);
    console.log("Includes SSBATCHNAME:", xml.includes("<SSBATCHNAME>"));
    console.log("Batches count in XML:", xml.match(/<SSBATCHNAME>/g)?.length ?? 0);
};

run().catch(console.error);

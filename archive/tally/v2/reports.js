import { reports } from "../../src/index.js";

const run = async () => {
    const res1 = await reports();
    // console.log("1 L:", res1);
    // console.log("1 L:", res1.substring(0, 3000));

    const start = res1.indexOf("<DSPDISPNAME>4.2 Tuna Hooks</DSPDISPNAME>");
    const end = res1.indexOf("<DSPACCNAME>", start + 1);

    console.log(res1.substring(start, end));
};

run().catch(console.error);

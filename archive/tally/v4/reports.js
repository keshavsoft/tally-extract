import { reports } from "../../src/index.js";

const run = async () => {
    const res1 = await reports();
    // console.log("1 L:", res1);
    // console.log("1 L:", res1.substring(0, 3000));
    console.log(res1.includes("<SSBATCHNAME>"));
    console.log(res1.match(/<SSBATCHNAME>/g)?.length ?? 0);
};

run().catch(console.error);

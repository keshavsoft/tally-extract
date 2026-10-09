import { reports } from "../../src/index.js";

const run = async () => {
    const res1 = await reports();
    console.log("1 L:", res1);
};

run().catch(console.error);

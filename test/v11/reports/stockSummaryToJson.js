import { run as runFlat } from "./flat/stockSummaryToJson.js";
import { run as runNested } from "./nested/stockSummaryToJson.js";

const run = async () => {
    await runFlat();
    await runNested();
};

if (process.argv[1]?.endsWith("stockSummaryToJson.js")) {
    run().catch(console.error);
}

export { run };

import { execSync } from "node:child_process";

const tests = [
    "node test/v11/index/company.js",
    "node test/v11/index/unit.js",
    "node test/v11/index/stockItems.js",
    "node test/v11/index/ledgers.js",
    "node test/v11/index/stockGroups.js",
    "node test/v11/index/godowns.js",
    "node test/v11/period/sales.js",
    "node test/v11/period/purchases.js",
    "node test/v11/reports/stockSummary.js",
    "node test/v11/reports/flat/stockSummaryToJson.js",
    "node test/v11/reports/nested/stockSummaryToJson.js"
];

console.log("=== Running all v11 tests sequentially ===");

for (const cmd of tests) {
    console.log(`\n> ${cmd}`);
    execSync(cmd, { stdio: "inherit" });
}

console.log("\n=== All v11 tests completed successfully! ===");

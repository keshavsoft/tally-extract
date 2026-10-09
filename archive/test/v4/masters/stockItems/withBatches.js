import tally, { call, asJson } from "../../../../src/index.js";

const run = async () => {
    console.log("=== Testing v4 (v6 Engine) Masters -> StockItems: withBatches ===");

    // 1. Core XML: call() returns raw XML string
    const xmlRes = await call("tally.masters.stockItems.withBatches", "mani9");
    console.log("1. call() returned XML string, length:", xmlRes.length);

    // 2. Consumer JSON: asJson() returns parsed object
    const jsonRes = await asJson("tally.masters.stockItems.withBatches", "mani9");
    console.log("2. asJson() returned object:", typeof jsonRes === "object");
    const stockItems = jsonRes?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKITEM;
    console.log("   StockItems count in JSON:", Array.isArray(stockItems) ? stockItems.length : 1);
    console.log("   First StockItem name:", Array.isArray(stockItems) ? stockItems[0]?.["@_NAME"] : stockItems?.["@_NAME"]);

    // 3. Tree Consumer JSON: tally.masters.stockItems.withBatches.asJson() returns parsed object
    const treeJson = await tally.masters.stockItems.withBatches.asJson("mani9");
    console.log("3. tally.masters.stockItems.withBatches.asJson() returned object:", typeof treeJson === "object");
};

run().catch(console.error);

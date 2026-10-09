import fs from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";
import { reports } from "../../../../src/index.js";

const parser = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
    trimValues: true,
    parseTagValue: false
});

const getText = ({ inNode, inTag = "#text" }) => {
    const localNode = inNode;
    const localTag = inTag;

    if (!localNode || typeof localNode !== "object") {
        return "";
    }

    for (const child of Array.isArray(localNode) ? localNode : [localNode]) {
        if (!child || typeof child !== "object") {
            continue;
        }

        if (localTag === "#text" && Object.hasOwn(child, "#text")) {
            return String(child["#text"] ?? "").trim();
        }

        if (Object.hasOwn(child, localTag)) {
            return getText({ inNode: child[localTag], inTag: "#text" });
        }

        for (const [key, value] of Object.entries(child)) {
            if (key === ":@") {
                continue;
            }

            const result = getText({ inNode: value, inTag: localTag });

            if (result !== "") {
                return result;
            }
        }
    }

    return "";
};

const findTag = ({ inNode, inTag }) => {
    const localNode = inNode;
    const localTag = inTag;

    if (!localNode || typeof localNode !== "object") {
        return null;
    }

    for (const child of Array.isArray(localNode) ? localNode : [localNode]) {
        if (!child || typeof child !== "object") {
            continue;
        }

        if (Object.hasOwn(child, localTag)) {
            return child[localTag];
        }

        for (const [key, value] of Object.entries(child)) {
            if (key === ":@") {
                continue;
            }

            const result = findTag({ inNode: value, inTag: localTag });

            if (result !== null) {
                return result;
            }
        }
    }

    return null;
};

const getStockValues = ({ inElement }) => {
    const localElement = inElement;

    const stockInfo = localElement.DSPSTKCL
        ? localElement
        : findTag({ inNode: localElement, inTag: "DSPSTKCL" }) ?? localElement;

    return {
        quantity: getText({ inNode: stockInfo, inTag: "DSPCLQTY" }),
        rate: getText({ inNode: stockInfo, inTag: "DSPCLRATE" }),
        amount: getText({ inNode: stockInfo, inTag: "DSPCLAMTA" })
    };
};

const normalizeStockSummary = (inParams) => {
    const localOrderedXml = Array.isArray(inParams)
        ? inParams
        : inParams?.inOrderedXml;

    const rows = [];

    let currentItem = "";
    let currentBatch = null;

    const processTag = ({ inTag, inElement }) => {
        const localTag = inTag;
        const localElement = inElement;

        if (localTag === "DSPACCNAME") {
            currentItem = getText({ inNode: localElement, inTag: "DSPDISPNAME" });
            currentBatch = null;
            return;
        }

        if (localTag === "SSBATCHNAME") {
            currentBatch = {
                batch: getText({ inNode: localElement, inTag: "SSBATCH" }),
                godown: getText({ inNode: localElement, inTag: "SSGODOWN" })
            };
            return;
        }

        if (localTag !== "DSPSTKINFO") {
            return;
        }

        const stock = getStockValues({ inElement: localElement });

        if (currentBatch) {
            rows.push({
                item: currentItem,
                ...stock,
                batch: currentBatch.batch,
                godown: currentBatch.godown,
                level: "batch"
            });

            currentBatch = null;
            return;
        }

        rows.push({
            item: currentItem,
            ...stock,
            batch: "",
            godown: "",
            level: "stock"
        });
    };

    const visit = ({ inNodes }) => {
        const localNodes = inNodes;

        if (!Array.isArray(localNodes)) {
            return;
        }

        for (const node of localNodes) {
            if (!node || typeof node !== "object") {
                continue;
            }

            for (const [tag, value] of Object.entries(node)) {
                if (tag === ":@") {
                    continue;
                }

                if (
                    tag === "DSPACCNAME" ||
                    tag === "DSPSTKINFO" ||
                    tag === "SSBATCHNAME"
                ) {
                    processTag({ inTag: tag, inElement: value });
                    continue;
                }

                visit({ inNodes: Array.isArray(value) ? value : [value] });
            }
        }
    };

    visit({ inNodes: localOrderedXml });

    return rows;
};

const saveToJson = async ({ inData, inFilePath }) => {
    const localData = inData;
    const localFilePath = inFilePath;

    await fs.writeFile(
        localFilePath,
        JSON.stringify(localData, null, 2),
        "utf-8"
    );
};

const run = async () => {
    const xml = await reports();
    const orderedXml = parser.parse(xml);
    const data = normalizeStockSummary({ inOrderedXml: orderedXml });

    const outputPath = "./test/v11/reports/flat/stockSummary.json";
    await saveToJson({ inData: data, inFilePath: outputPath });

    const totalBatches = data.filter((row) => row.level === "batch").length;
    const totalItems = data.filter((row) => row.level === "stock").length;

    console.log(`[Flat Flavor] Parsed ${data.length} total rows:`);
    console.log(` - Stock Items: ${totalItems}`);
    console.log(` - Batches: ${totalBatches}`);
    console.log(`Saved to ${outputPath}`);
    return data;
};

export { normalizeStockSummary, run };

if (process.argv[1]?.endsWith("stockSummaryToJson.js")) {
    run().catch(console.error);
}

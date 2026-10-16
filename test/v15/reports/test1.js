import fs from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";
import { reports } from "../../../src/index.js";

const parser = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
    trimValues: true,
    parseTagValue: false
});

const getText = ({ inNode, inTag }) => {
    if (!inNode || typeof inNode !== "object") {
        return "";
    }

    const nodes = Array.isArray(inNode) ? inNode : [inNode];

    for (const node of nodes) {
        if (!node || typeof node !== "object") {
            continue;
        }

        if (Object.hasOwn(node, inTag)) {
            const value = node[inTag];

            if (Array.isArray(value)) {
                return getText({
                    inNode: value,
                    inTag: "#text"
                });
            }

            if (value && typeof value === "object") {
                return getText({
                    inNode: value,
                    inTag: "#text"
                });
            }

            return String(value ?? "").trim();
        }

        if (inTag === "#text" && Object.hasOwn(node, "#text")) {
            return String(node["#text"] ?? "").trim();
        }

        for (const [key, value] of Object.entries(node)) {
            if (key === ":@") {
                continue;
            }

            const result = getText({
                inNode: value,
                inTag
            });

            if (result !== "") {
                return result;
            }
        }
    }

    return "";
};

const getDirectChild = ({ inNode, inTag }) => {
    const nodes = Array.isArray(inNode) ? inNode : [inNode];

    for (const node of nodes) {
        if (
            node &&
            typeof node === "object" &&
            Object.hasOwn(node, inTag)
        ) {
            return node[inTag];
        }
    }

    return null;
};

const getStockValues = ({ inElement }) => {
    const stockClosing = getDirectChild({
        inNode: inElement,
        inTag: "DSPSTKCL"
    });

    const stockInfo = stockClosing ?? inElement;

    return {
        quantity: getText({
            inNode: stockInfo,
            inTag: "DSPCLQTY"
        }),
        rate: getText({
            inNode: stockInfo,
            inTag: "DSPCLRATE"
        }),
        amount: getText({
            inNode: stockInfo,
            inTag: "DSPCLAMTA"
        })
    };
};

const getBatch = ({ inElement }) => ({
    name: getText({
        inNode: inElement,
        inTag: "SSBATCH"
    }),
    godown: getText({
        inNode: inElement,
        inTag: "SSGODOWN"
    })
});

const normalizeStockSummary = ({ inOrderedXml }) => {
    const orderedXml = Array.isArray(inOrderedXml)
        ? inOrderedXml
        : [inOrderedXml];

    const items = [];

    let currentItem = null;
    let pendingBatch = null;

    const processNode = ({ inTag, inElement }) => {
        if (inTag === "DSPACCNAME") {
            currentItem = {
                item: getText({
                    inNode: inElement,
                    inTag: "DSPDISPNAME"
                }),
                closing: null,
                batches: []
            };

            items.push(currentItem);
            pendingBatch = null;

            return;
        }

        if (inTag === "SSBATCHNAME") {
            pendingBatch = getBatch({
                inElement
            });

            return;
        }

        if (inTag !== "DSPSTKINFO" || !currentItem) {
            return;
        }

        const closing = getStockValues({
            inElement
        });

        if (pendingBatch !== null) {
            currentItem.batches.push({
                name: pendingBatch.name,
                godown: pendingBatch.godown,
                closing
            });

            pendingBatch = null;

            return;
        }

        if (currentItem.closing === null) {
            currentItem.closing = closing;
        } else {
            currentItem.additionalBalances ??= [];
            currentItem.additionalBalances.push(closing);
        }
    };

    const visit = (nodes) => {
        if (!Array.isArray(nodes)) {
            return;
        }

        for (const node of nodes) {
            if (!node || typeof node !== "object") {
                continue;
            }

            for (const [tag, value] of Object.entries(node)) {
                if (tag === ":@" || tag === "#text") {
                    continue;
                }

                if (
                    tag === "DSPACCNAME" ||
                    tag === "DSPSTKINFO" ||
                    tag === "SSBATCHNAME"
                ) {
                    processNode({
                        inTag: tag,
                        inElement: value
                    });

                    continue;
                }

                visit(
                    Array.isArray(value) ? value : [value]
                );
            }
        }
    };

    visit(orderedXml);

    return items;
};

const saveToJson = async ({ inData, inFilePath }) => {
    await fs.writeFile(
        inFilePath,
        JSON.stringify(
            { items: inData },
            null,
            2
        ),
        "utf-8"
    );
};

const run = async () => {
    const inCompany = "mani9";

    const xml = await reports(
        "tally.reports.stockSummary",
        inCompany
    );

    const orderedXml = parser.parse(xml);

    const items = normalizeStockSummary({
        inOrderedXml: orderedXml
    });

    const batchCount = items.reduce(
        (total, item) => total + item.batches.length,
        0
    );

    const blankBatchNames = items.flatMap((item) =>
        item.batches
            .filter((batch) => !batch.name)
            .map((batch) => item.item)
    );

    const missingStockTotals = items.filter(
        (item) => item.closing === null
    );

    console.log("Stock items:", items.length);
    console.log("Batch records:", batchCount);
    console.log(
        "Batches with blank names:",
        blankBatchNames.length
    );
    console.log(
        "Items without total closing record:",
        missingStockTotals.length
    );

    const outPath = new URL(
        "./stockSummary1.json",
        import.meta.url
    );

    await saveToJson({
        inData: items,
        inFilePath: outPath
    });

    console.log(
        `Saved ${items.length} stock items to stockSummary1.json`
    );

    return items;
};

run().catch(console.error);

export {
    normalizeStockSummary,
    saveToJson
};
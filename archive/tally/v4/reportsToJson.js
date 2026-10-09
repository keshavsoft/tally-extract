
import { reports } from "../../src/index.js";
import parseXml from "./parseXml.js";

const normalizeStockSummary = (envelope) => {
    const names = envelope.DSPACCNAME ?? [];
    const balances = envelope.DSPSTKINFO ?? [];
    const batches = envelope.SSBATCHNAME ?? [];

    const stockNames = Array.isArray(names) ? names : [names];
    const stockBalances = Array.isArray(balances) ? balances : [balances];
    const batchNames = Array.isArray(batches) ? batches : [batches];

    const rows = stockNames.map((name, index) => {
        const stock = stockBalances[index]?.DSPSTKCL ?? {};

        return {
            item: name.DSPDISPNAME ?? "",
            quantity: stock.DSPCLQTY ?? "",
            rate: stock.DSPCLRATE ?? "",
            amount: stock.DSPCLAMTA ?? "",
            batch: "",
            godown: "",
            level: "stock"
        };
    });

    // Batch entries are currently separate from stock entries.
    // Keep them separate until their parent-item relationship is confirmed.
    const batchRows = batchNames.map((batch) => ({
        item: "",
        quantity: "",
        rate: "",
        amount: "",
        batch: batch.SSBATCH ?? "",
        godown: batch.SSGODOWN ?? "",
        level: "batch"
    }));

    return { rows, batchRows };
};

const run = async () => {
    const xml = await reports();

    const elements = xml.match(
        /<(DSPACCNAME|DSPSTKINFO|SSBATCHNAME)>[\s\S]*?<\/\1>/g
    ) ?? [];

    const rows = [];
    let currentItem = "";

    for (const element of elements) {
        if (element.startsWith("<DSPACCNAME>")) {
            const match = element.match(
                /<DSPDISPNAME>([\s\S]*?)<\/DSPDISPNAME>/
            );

            currentItem = match?.[1]?.trim() ?? "";

            rows.push({
                item: currentItem,
                quantity: "",
                rate: "",
                amount: "",
                batch: "",
                godown: "",
                level: "stock"
            });

            continue;
        }

        if (element.startsWith("<SSBATCHNAME>")) {
            const batch = element.match(
                /<SSBATCH>([\s\S]*?)<\/SSBATCH>/
            )?.[1]?.trim() ?? "";

            const godown = element.match(
                /<SSGODOWN>([\s\S]*?)<\/SSGODOWN>/
            )?.[1]?.trim() ?? "";

            rows.push({
                item: currentItem,
                quantity: "",
                rate: "",
                amount: "",
                batch,
                godown,
                level: "batch"
            });
        }
    };

    console.log("rows : ", rows[0]);
    console.log("rows : ", rows[100]);
    console.log("rows : ", rows[500]);
};

const run1 = async () => {
    const xml = await reports();
    const json = parseXml(xml);
    const envelope = json?.ENVELOPE;

    if (!envelope) {
        throw new Error("Tally response does not contain ENVELOPE");
    }

    const { rows, batchRows } = normalizeStockSummary(envelope);

    console.log("Stock rows:", rows.length);
    console.log("Batch rows:", batchRows.length);

    console.dir(rows.slice(0, 5), { depth: null });
    console.dir(batchRows.slice(0, 5), { depth: null });
};

run().catch(console.error);

export { normalizeStockSummary };

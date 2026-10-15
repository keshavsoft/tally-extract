# Version 13

This is an isolated copy of the latest v12 implementation, with two separate approaches:

- `tdl1/` — copied from `src/v12/`; its contents are unchanged from that source.
- `reports1/` — independent report-ID requests using `<TYPE>Data</TYPE>` and a report `<ID>`.

The original `src/v12/` directory and package entry points are unchanged.

## Report ID example

```js
import { stockSummary, report } from "./reports1/index.js";

const xml = await stockSummary({ company: "mani9" });
// Or request another built-in report by ID:
const trialBalanceXml = await report({ reportId: "Trial Balance", company: "mani9" });
```

Tally must be listening at `http://localhost:9000` by default. The report implementation does not include a custom `<TDL>` / `<TDLMESSAGE>` block.

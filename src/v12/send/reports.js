import transport from "./transport.js";
import reportTemplate from "./templates/reports/stockSummary.js";

const startFunc = async () => {
    return await transport({
        inXml: reportTemplate
    });
};

export default startFunc;

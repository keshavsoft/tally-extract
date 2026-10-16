import transport from "./transport.js";
import stockSummaryTemplate from "./templates/stockSummary.js";

const report = async ({
    reportId = "Stock Summary",
    company = "mani9",
    explode = true,
    url = "http://localhost:9000"
} = {}) => {
    const inXml = stockSummaryTemplate({ reportId, company, explode });
    return transport({ inXml, url });
};

const stockSummary = async (options = {}) => report({ ...options, reportId: "Stock Summary" });

export { report, stockSummary };
export default report;

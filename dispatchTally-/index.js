import transport from "./transport.js";
import { companyTemplate } from "./templates.js";

const startFunc = async ({ inTdlMessage, inParam, inCompany }) => {
    const localTdlMessage = inTdlMessage;
    const localCompany = inCompany ?? inParam;

    let localXml = companyTemplate.replace("{{TDLMESSAGE}}", () => localTdlMessage);

    if (localCompany) {
        const companyTag = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>`;
        localXml = localXml.replace("</STATICVARIABLES>", `    ${companyTag}\n            </STATICVARIABLES>`);
    }

    const rawResponse = await transport({
        inXml: localXml
    });

    return rawResponse;
};

export default startFunc;

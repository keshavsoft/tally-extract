import { companyTemplate } from "./templates.js";

/**
 * Story: Sending XML Payload to Tally
 * 
 * 1. Wraps the TDL message into the Tally XML envelope.
 * 2. Injects SVCURRENTCOMPANY if a company name is supplied.
 * 3. Dispatches HTTP POST to http://localhost:9000.
 * 4. Returns the raw XML response text.
 */
const startFunc = async ({ inTdlMessage, inCompany }) => {
    const localTdlMessage = inTdlMessage;
    const localCompany = inCompany;
    const localUrl = "http://localhost:9000";

    let localXml = companyTemplate.replace("{{TDLMESSAGE}}", () => localTdlMessage);

    if (localCompany) {
        const companyTag = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>`;
        localXml = localXml.replace("</STATICVARIABLES>", `    ${companyTag}\n            </STATICVARIABLES>`);
    }

    const response = await fetch(localUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: localXml
    });

    return await response.text();
};

export default startFunc;

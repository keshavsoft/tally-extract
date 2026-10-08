import { variableTemplate } from "./templates.js";

/**
 * Story: Sending XML Payload to Tally
 * 
 * 1. Wraps the TDL message into the Tally XML envelope.
 * 2. Injects SVCURRENTCOMPANY if a company name is supplied.
 * 3. Dispatches HTTP POST to http://localhost:9000.
 * 4. Returns the raw XML response text.
 */
const startFunc = async ({ inTdlMessage, inCompany, inFromDate, inToDate }) => {
    const localTdlMessage = inTdlMessage?.replaceAll("$$$$", "$$");
    const localCompany = inCompany;
    const localFromDate = inFromDate;
    const localToDate = inToDate;
    const localUrl = "http://localhost:9000";

    let localXml = variableTemplate.replace("{{TDLMESSAGE}}", () => localTdlMessage);

    if (localCompany) {
        const companyTag = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>`;
        const fromDateTag = `<SVFROMDATE TYPE="Date">${localFromDate}</SVFROMDATE>`;
        const toDateTag = `<SVTODATE TYPE="Date">${localToDate}</SVTODATE>`;
        localXml = localXml.replace("{{STATICVARIABLES}}", companyTag + fromDateTag + toDateTag);
    } else {
        const fromDateTag = `<SVFROMDATE TYPE="Date">${localFromDate}</SVFROMDATE>`;
        const toDateTag = `<SVTODATE TYPE="Date">${localToDate}</SVTODATE>`;
        localXml = localXml.replace("{{STATICVARIABLES}}", fromDateTag + toDateTag);
    }

    const response = await fetch(localUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: localXml
    });
    // console.log("localXml : ", inFromDate, inToDate, localXml);

    return await response.text();
};

export default startFunc;

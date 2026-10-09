import { reportTemplate } from "./templates.js";

const startFunc = async () => {
    const localUrl = "http://localhost:9000";

    const response = await fetch(localUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: reportTemplate
    });

    return await response.text();
};

export default startFunc;

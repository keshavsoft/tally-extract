const transport = async ({ inXml, url = "http://localhost:9000" }) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: inXml
    });

    if (!response.ok) {
        throw new Error(`Tally request failed: ${response.status} ${response.statusText}`);
    }

    return response.text();
};

export default transport;

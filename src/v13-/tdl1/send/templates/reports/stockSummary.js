const reportTemplate = `
<ENVELOPE>
    <HEADER>
        <VERSION>1</VERSION>
        <TALLYREQUEST>Export</TALLYREQUEST>
        <TYPE>Data</TYPE>
        <ID>Stock Summary</ID>
    </HEADER>
    <BODY>
        <DESC>
            <STATICVARIABLES>
                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                <SVCURRENTCOMPANY>mani9</SVCURRENTCOMPANY>
                <EXPLODEFLAG>Yes</EXPLODEFLAG>
                <ISITEMWISE>Yes</ISITEMWISE>
            </STATICVARIABLES>
            <TDL>
                <TDLMESSAGE>
                    <REPORT NAME="Stock Summary">
                        <SET>IsItemWise: Yes</SET>
                    </REPORT>
                </TDLMESSAGE>
            </TDL>
        </DESC>
    </BODY>
</ENVELOPE>
`;

export { reportTemplate };
export default reportTemplate;

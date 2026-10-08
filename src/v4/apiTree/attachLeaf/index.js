const startFunc = ({ inTarget, inLeaf, inPath, inCall }) => {
    const localTarget = inTarget;
    const localLeaf = inLeaf;
    const localPath = inPath;
    const localCall = inCall;

    localTarget[localLeaf] = (inCompany) => localCall(localPath, inCompany);
};

export default startFunc;

import call from "./call/index.js";
import createApiTree from "./apiTree/index.js";

const tree = createApiTree({ inCall: call });

const tally = (inPath, inCompany) => call(inPath, inCompany);
Object.assign(tally, tree);

export default tally;
export { call };

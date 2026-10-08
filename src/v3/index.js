import call from "./call/index.js";
import createApiTree from "./apiTree/index.js";

const tally = createApiTree({ inCall: call });

export default tally;
export { call };

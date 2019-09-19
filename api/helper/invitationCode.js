const appRoot = require("app-root-path");
const { generateRandom } = require(`${appRoot}/api/helper/random`);

exports.generateInvitationCode = () => {
  return generateRandom(6);
}
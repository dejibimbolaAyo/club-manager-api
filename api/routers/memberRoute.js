const {declineInvitation, acceptInvitation, updateProfile} = require("../controllers/memberController");

const {protectRoute} = require('./baseRoute')
const {isMember} = require('../middleware/access/userAccess')

module.exports = function memberRoutes(router) {
  router
    .route('/member')
    .put([protectRoute, isMember], updateProfile);

  router
    .route('/invitation/accept')
    .post([protectRoute, isMember], acceptInvitation);

  router
    .route('/invitation/decline')
    .delete([protectRoute, isMember], declineInvitation);
};
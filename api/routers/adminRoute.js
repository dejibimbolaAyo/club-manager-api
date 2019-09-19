const {
  createClub,
  getClubMetrics,
  getClubMembers,
  deleteClubMember,
  updateProfile,
  sendInvitation
} = require("../controllers/adminController");
const {validate} = require("../middleware/validation/userValidation");
const {protectRoute} = require('./baseRoute')
const {isAdmin} = require('../middleware/access/userAccess')
module.exports = function adminRoutes(router) {
  router
    .route('/invite')
    .post([
      protectRoute, isAdmin
    ], sendInvitation);

  router
    .route('/club')
    .post([
      protectRoute, isAdmin
    ], createClub);

  router
    .route('/club/:clubId')
    .get([
      protectRoute, isAdmin
    ], getClubMetrics);

  router
    .route('/club/:clubId/members')
    .get([
      protectRoute, isAdmin
    ], getClubMembers);

  router
    .route('/club/:memberId')
    .delete([
      protectRoute, isAdmin
    ], deleteClubMember);

  router
    .route('/admin')
    .put([
      protectRoute, isAdmin
    ], updateProfile);

};
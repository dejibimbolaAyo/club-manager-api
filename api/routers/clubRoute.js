const {getClubs} = require("../controllers/clubController");
const {validate} = require("../middleware/validation/userValidation");

module.exports = function adminRoutes(router) {
  router
    .route('/clubs')
    .get(getClubs);
};
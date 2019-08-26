const {getUsers, getUser, createUser, authenticate, updateUser} = require("../controllers/userController");
const {validate} = require("../middleware/validation/userValidation");

module.exports = function userRoutes(router) {
    router.route('/users')
        .get(getUsers);

    router.route('/user/:id')
        .get(getUser);

    router.route('/user/create')
        .post(validate('createUser'), createUser);

    router.route('/user/auth')
        .post(validate('authUser'), authenticate);
};
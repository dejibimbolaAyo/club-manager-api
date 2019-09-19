const {getUsers, getUser, createAdmin, createMember, authenticate, deleteAdmin, deleteMember} = require("../controllers/userController");
const {validate} = require("../middleware/validation/userValidation");

const {protectRoute} = require('./baseRoute')
const {isAdmin} = require('../middleware/access/userAccess')

module.exports = function userRoutes(router) {
    router.route('/users')
        .get(getUsers);

    router.route('/user/:id')
        .get(getUser);

    router.route('/user/admin')
        .post(validate('createUser'), createAdmin);

    router.route('/user/member')
        .post(validate('createUser'), createMember);

    router.route('/user/admin')
        .delete([protectRoute, isAdmin], deleteAdmin);

    router.route('/user/member')
        .delete([protectRoute, isAdmin], deleteMember);

    router.route('/user/auth')
        .post(validate('authUser'), authenticate);
};
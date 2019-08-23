import router from "./index";
import base from "./base";
import {validate} from "../middleware/validation/user"
import * as userController from "./../controllers/user";

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/users/create', validate('createUser'), userController.createUser);
router.post('/users/auth', validate('authUser'), userController.authenticate);
router.put('/users/:id', base.protectRoute, userController.updateUser);

export default router;
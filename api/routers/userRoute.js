import router from "./index";
import base from "./baseRoute";
import {validate} from "../middleware/validation/userValidation"
import * as userController from "../controllers/userController";

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/users/create', validate('createUser'), userController.createUser);
router.post('/users/auth', validate('authUser'), userController.authenticate);
router.put('/users/:id', base.protectRoute, userController.updateUser);

export default router;
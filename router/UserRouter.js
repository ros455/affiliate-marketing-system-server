import { Router } from "express";
import * as UsersController from '../controller/UserController.js';
import checkAuth from "../utils/checkAuth.js";
import checkAdmin from "../utils/checkAdmin.js";

const router = new Router();

router.post('/register',UsersController.register);
router.post('/login',UsersController.login);
router.patch('/update-user-data',UsersController.updateData);
router.get('/get-me',checkAuth,UsersController.getMe);
router.get('/get-all-users',checkAdmin,UsersController.getAllUsers);
router.get('/search-users',UsersController.searchUsers);
export default router;
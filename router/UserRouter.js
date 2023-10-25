import { Router } from "express";
import * as UsersController from '../controller/UserController.js';
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.post('/register-user',UsersController.register);
router.post('/login-user',UsersController.login);
router.get('/get-me',checkAuth,UsersController.getMe)

export default router;
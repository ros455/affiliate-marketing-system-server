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
router.patch('/update-user-balance',UsersController.updateUserBalance);
router.patch('/update-user-bonus',UsersController.updateUserBonuse);
router.patch('/update-user-link',UsersController.updateUserLink);
router.patch('/update-user-promo-code',UsersController.updateUserPromotionalCode);
router.patch('/update-wallet-address',UsersController.updateWalletAddress);
// router.patch('/aprove-user-history',UsersController.createSuccessfullyHistoryEvent);
// router.patch('/cancelled-user-history',UsersController.createCancelledHistoryEvent);
router.get('/download-big-banner',UsersController.dowloadBigBaner);
router.get('/download-middle-banner',UsersController.dowloadMiddleBaner);
router.get('/download-small-banner',UsersController.dowloadSmallBaner);
router.get('/get-all-banners',UsersController.getAllBanners);
export default router;
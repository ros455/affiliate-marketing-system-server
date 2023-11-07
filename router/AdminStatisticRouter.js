import { Router } from "express";
import * as AdminStatisticController from '../controller/AdminStatisticController.js';
import checkAdmin from "../utils/checkAdmin.js";
const router = new Router();

router.post('/create-admin-statistic',AdminStatisticController.createAdminStatistic);
router.get('/get-admin-statistic',checkAdmin,AdminStatisticController.getAdminStatistic);

export default router;
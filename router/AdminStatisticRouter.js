import { Router } from "express";
import * as AdminStatisticController from '../controller/AdminStatisticController.js';

const router = new Router();

router.post('/create-admin-statistic',AdminStatisticController.createAdminStatistic);

export default router;
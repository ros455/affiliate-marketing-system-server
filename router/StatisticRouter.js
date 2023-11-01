import { Router } from "express";
import * as StatisticController from '../controller/StatisticController.js';

const router = new Router();

router.get('/click',StatisticController.handleLink);
// router.post('/buy',StatisticController.handleBuy);
router.post('/create-link',StatisticController.createPartnerStatistic);
router.get('/get-event-last-month/:id',StatisticController.getEventsForCurrentMonth);

export default router;
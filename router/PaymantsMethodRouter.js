import { Router } from "express";
import * as PaymantsMethodController from '../controller/PaymantsMethodController.js';

const router = new Router();

router.post('/create-paymant-method',PaymantsMethodController.createPaymantMethod);
router.patch('/update-paymant-method',PaymantsMethodController.updatePaymantMethod);
router.delete('/delete-paymant-method',PaymantsMethodController.deletePaymantMethod);
router.get('/get-all-paymants-method',PaymantsMethodController.getAllPaymantsMethod);

export default router;
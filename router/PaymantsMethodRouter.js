import { Router } from "express";
import * as PaymantsMethodController from '../controller/PaymantsMethodController.js';
import checkAdmin from "../utils/checkAdmin.js";
const router = new Router();

router.post('/create-paymant-method',checkAdmin,PaymantsMethodController.createPaymantMethod);
router.patch('/update-paymant-method',checkAdmin,PaymantsMethodController.updatePaymantMethod);
router.delete('/delete-paymant-method',checkAdmin,PaymantsMethodController.deletePaymantMethod);
router.get('/get-all-paymants-method',checkAdmin,PaymantsMethodController.getAllPaymantsMethod);

export default router;
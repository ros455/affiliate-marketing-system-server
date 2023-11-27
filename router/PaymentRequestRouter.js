import { Router } from "express";
import * as PaymentRequestController from '../controller/PaymentRequestController.js';
import checkAdmin from "../utils/checkAdmin.js";
import checkAuth from "../utils/checkAuth.js";
const router = new Router();

router.post('/send-paymant-request',checkAuth,PaymentRequestController.createPaymantItem);
router.patch('/aprove-request',checkAdmin,PaymentRequestController.aproveRequest);
router.patch('/cancelled-request',checkAdmin,PaymentRequestController.cancelledRequest);
router.get('/get-all-paymant-request',checkAdmin,PaymentRequestController.getAllPaymantItem);
router.get('/get-all-paymant-request-for-user',checkAuth,PaymentRequestController.getAllPaymantItemForUser);

export default router;
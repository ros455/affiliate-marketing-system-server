import { Router } from "express";
import * as PaymentRequestController from '../controller/PaymentRequestController.js';

const router = new Router();

router.post('/send-paymant-request',PaymentRequestController.createPaymantItem);
router.patch('/aprove-request',PaymentRequestController.aproveRequest);
router.patch('/cancelled-request',PaymentRequestController.cancelledRequest);
router.get('/get-all-paymant-request',PaymentRequestController.getAllPaymantItem);
router.get('/get-all-paymant-request-for-user',PaymentRequestController.getAllPaymantItemForUser);

export default router;
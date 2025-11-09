import express from 'express';
import {
  createOrder,
  verifyPayment,
  paymentWebhook, // NEW
} from '../controllers/paymentController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

// --- USER-PROTECTED ROUTES (Must be logged in) ---
router.post('/create-order', isAuth, createOrder);
router.post('/verify', isAuth, verifyPayment);

// --- PUBLIC WEBHOOK ROUTE (Called by Razorpay) ---
router.post('/webhook', paymentWebhook);

export default router;
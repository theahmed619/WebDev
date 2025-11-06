import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

// Both routes are protected. A user must be logged in.
router.post('/create-order', isAuth, createOrder);
router.post('/verify', isAuth, verifyPayment);

export default router;

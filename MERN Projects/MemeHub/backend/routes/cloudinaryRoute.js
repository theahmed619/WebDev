import express from 'express';
import { getCloudinarySignature } from '../controllers/cloudinaryController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();


router.get('/signature', isAuth,getCloudinarySignature);

export default router;
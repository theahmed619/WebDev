import express from 'express';
import { getCloudinarySignature } from '../controllers/cloudinaryController.js';
import { isAuth } from '../middleware/isAuth.js';
import { isAdmin } from '../middleware/isAdmin.js'; // NEW

const router = express.Router();

// This route should only be accessible by the Admin
router.get('/signature', isAuth, isAdmin, getCloudinarySignature);

export default router;
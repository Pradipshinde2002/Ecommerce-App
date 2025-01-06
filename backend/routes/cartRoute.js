import authUser from '../middleware/auth.js'


import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add',authUser, addToCart);
router.post('/update',authUser, updateCart);
router.post('/get',authUser, getUserCart);

export default router;

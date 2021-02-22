import express from 'express';
import lift from './action/lift';

const router = express.Router();

router.use('/lift', lift);

export default router;

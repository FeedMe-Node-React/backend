import express from 'express';
import imageController from '../controllers/image';

const router = express.Router();

router.get('/upload', imageController.getSignedUrl);

module.exports = router;
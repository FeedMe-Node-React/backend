import express from 'express';
import uploadController from '../controllers/upload';

const router = express.Router();

router.get('/upload', uploadController.getSignedUrl);

module.exports = router;
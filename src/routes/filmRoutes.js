




const express = require('express');
const filmController = require('../controllers/filmController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();


router.post('/create', authMiddleware, roleMiddleware(['admin']), filmController.store.bind(filmController));

module.exports = router;
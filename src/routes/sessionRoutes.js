const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/create', authMiddleware,roleMiddleware(['admin']), SessionController.store.bind(SessionController));
router.get('/', authMiddleware, SessionController.index.bind(SessionController));
router.get('/:id', authMiddleware, SessionController.show.bind(SessionController));
router.put('/:id', authMiddleware,roleMiddleware(['admin']), SessionController.update.bind(SessionController));
router.delete('/:id', authMiddleware, SessionController.destroy.bind(SessionController));

module.exports = router;
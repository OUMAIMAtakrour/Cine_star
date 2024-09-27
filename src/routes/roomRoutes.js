const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, RoomController.store.bind(RoomController));
router.get('/', authMiddleware, RoomController.index.bind(RoomController));
router.get('/:id', authMiddleware, RoomController.show.bind(RoomController));
router.put('/:id', authMiddleware, RoomController.update.bind(RoomController));
router.delete('/:id', authMiddleware, RoomController.destroy.bind(RoomController));

module.exports = router;
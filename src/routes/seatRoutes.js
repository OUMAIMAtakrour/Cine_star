const express = require("express");
const router = express.Router();
const SeatController = require("../controllers/seatController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/create", authMiddleware,
    roleMiddleware(["admin"]), SeatController.createSeat);
router.get("/", SeatController.getAllSeats);
router.get("/:id", SeatController.getSeatById);
router.put("/:id", authMiddleware, SeatController.updateSeat);
router.delete("/:id", authMiddleware, SeatController.deleteSeat);
router.get("/room/:roomId", SeatController.getSeatsByRoom);

module.exports = router;

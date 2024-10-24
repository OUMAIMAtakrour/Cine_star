const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["client"]),
  reservationController.store.bind(reservationController)
);

router.get("/", reservationController.index);

router.get("/:id", reservationController.show.bind(reservationController));

router.put("/:id", reservationController.update);

router.delete("/:id", reservationController.destroy);

module.exports = router;

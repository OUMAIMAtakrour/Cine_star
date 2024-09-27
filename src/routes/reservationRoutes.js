const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.post("/create", reservationController.store.bind(reservationController));

router.get("/", reservationController.index);

router.get("/:id", reservationController.show);

router.put("/:id", reservationController.update);

router.delete("/:id", reservationController.destroy);

module.exports = router;

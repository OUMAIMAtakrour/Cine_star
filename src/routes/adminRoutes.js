const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

module.exports = router;

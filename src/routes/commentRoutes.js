const express = require("express");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const Comment = require("../models/Comment");
// const upload = require("../config/imageConfig");
const multer = require("multer");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  commentController.store.bind(commentController)
);

router.get("/", commentController.index.bind(commentController));

router.get("/:id", commentController.show.bind(commentController));

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  commentController.update.bind(commentController)
);
router.get(
  "/:movieId/comments",
  commentController.getCommentsByMovieId.bind(commentController)
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  commentController.destroy.bind(commentController)
);

module.exports = router;

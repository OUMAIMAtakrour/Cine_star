const express = require("express");
const filmController = require("../controllers/filmController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const uploads = require("../middleware/multer");
const upload = require("../config/imageConfig");
const multer = require("multer");

const router = express.Router();

// router.post(
//   "/create",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   upload.single('image'),
//   filmController.store.bind(filmController)
// );
console.log("FilmController:", filmController);
console.log("FilmController.store:", filmController.store);

// router.post(
//   "/create",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "video", maxCount: 1 },
//   ]),
//   filmController.store.bind(filmController)
// );

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  filmController.store.bind(filmController)
);
router.get("/", authMiddleware, filmController.index.bind(filmController));
router.get(
  "/:id/sessions",
  filmController.getFilmWithSessions.bind(filmController)
);
router.get("/:id", filmController.show.bind(filmController));
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  filmController.update.bind(filmController)
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  filmController.destroy.bind(filmController)
);

module.exports = router;

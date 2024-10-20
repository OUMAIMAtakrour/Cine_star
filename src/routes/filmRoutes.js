const express = require("express");
const filmController = require("../controllers/filmController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
// const uploads = require("../middleware/multer");
// const upload = require("../config/imageConfig");
const path = require("path");

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

const upload = multer({ 
  storage: multer.memoryStorage(),
  // limits: {
  //   fileSize: 10 * 1024 * 1024, // 10MB limit
  // },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"), false);
      }
    } else if (file.fieldname === "video") {
      if (!file.mimetype.startsWith("video/")) {
        return cb(new Error("Only video files are allowed!"), false);
      }
    }
    cb(null, true);
  }
});

router.post('/create',authMiddleware, upload.fields([{ name: 'image' }, { name: 'video' }]), (req, res) => {
  filmController.store(req, res);
});
router.get("/", authMiddleware, filmController.index.bind(filmController));
router.get("/all", authMiddleware, filmController.getAllFilms.bind(filmController));
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

const Router = require("express");
const multer = require("multer");

const clothesController = require("../controllers/clothesController");
const { Clothes } = require("../models/models");

const router = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "static/images");
  },
  filename: function (req, { originalname }, callback) {
    callback(null, originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), clothesController.create);
router.get("/", clothesController.getAll);
router.get("/:id", clothesController.getOne);
router.get("/:type", clothesController.getAllByType);

module.exports = router;

// http://localhost:5000/api/clothes/

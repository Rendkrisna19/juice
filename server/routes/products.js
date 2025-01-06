const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Product } = require("../models"); // Sesuaikan model Anda

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? "/uploads/products/" + req.file.filename : null;

  Product.create({ name, price, description, image })
    .then((product) => res.status(201).json(product))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;

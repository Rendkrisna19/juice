const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Folder untuk menyimpan file upload
const uploadDir = path.join(__dirname, "../uploads");

// Buat folder `uploads` jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Direktori tujuan untuk menyimpan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`); // Penamaan file unik
  },
});

// Filter jenis file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .png, and .gif formats are allowed!"), false);
  }
};

// Middleware multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Batas ukuran file 2MB
  fileFilter: fileFilter,
});

module.exports = upload;

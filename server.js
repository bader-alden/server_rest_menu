const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const multer = require("multer");
const path = require("path");

const dbConnection = require("./config/database");

const MainCategoriesRoute = require("./routes/MainCategoriesRoutes");
const UserCategoriesRoute = require("./routes/UserCategoriesRoutes");
dbConnection();
const app = express();
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
  console.log(`hello`);
}
app.use("/api/v1/MainCategories", MainCategoriesRoute);
app.use("/api/v1/UserCategories", UserCategoriesRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

// إعداد مكان التخزين للملفات المرفوعة
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// تأكد من أن مجلد 'uploads' موجود
const fs = require("fs");
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// إعداد مسار رفع الملفات
app.post("/upload", upload.single("image"), (req, res) => {
  res.send(
    `File uploaded successfully: <a href="/${req.file.path}">${req.file.path}</a>`
  );
});

// إعداد مسار لخدمة الملفات الثابتة
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

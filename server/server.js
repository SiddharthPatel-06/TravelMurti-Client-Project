const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { cloudinary } = require("./config/cloudinaryConfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { botAdminEmail } = require("./templates/botAdminEmail");
const https = require('https');

const app = express();
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

const connect = require("./config/db");
connect.connectDB();

const packageRoutes = require("./routes/packageRoutes");
const subPackageRoutes = require("./routes/subPackageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const enquiryRoutes = require("./routes/enquiryRoutes");
const jobRoute = require("./routes/jobRoute");

app.use("/api/packages", packageRoutes);
app.use("/api/subpackages", subPackageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api", enquiryRoutes);
app.use("/api/jobs", jobRoute);

app.use(errorHandlingMiddleware);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
  },
});

const upload = multer({ storage: storage });

const maxCount = 10;
app.post("/upload", upload.array("galleryImages", maxCount), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(req.files);

  res
    .status(200)
    .json({ message: "Files uploaded successfully!", files: req.files });
});

app.post("/update-image", upload.single("imageUrl"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: "contact.travelmurti@gmail.com",
    subject: "New User Submission from Bot",
    html: botAdminEmail(name, email, phone),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Submission received and email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
});

app.get("/api/status", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

const PORT = process.env.PORT || 5000;
// Load SSL Certificates
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/www.travelmurti.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.travelmurti.com/fullchain.pem')
};

// Start HTTPS server
https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Secure server running on https://0.0.0.0:${PORT}`);
});

const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded videos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename for uploaded videos
  },
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.array('videos', 10), (req, res) => {
  // The 'videos' field name should match the frontend input field for file uploads

  const uploadedFiles = req.files.map((file) => file.filename);
  // Process the uploaded videos here, convert to different formats, upload to social media platforms, etc.

  res.json({ success: true, files: uploadedFiles });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

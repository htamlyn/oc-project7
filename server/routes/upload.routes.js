module.exports = app => {
    const upload = require ('../controllers/cloudinary.controller');

    // Upload file to Cloudinary
    app.post("/upload", upload.uploadFile);

    // Delete file from Cloudinary with requested public_id
    app.delete("/upload", upload.deleteFile);
}
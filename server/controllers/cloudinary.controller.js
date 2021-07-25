const {cloudinary} = require('../config/cloudinary');

exports.uploadFile = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {upload_preset: 'ml_default'});
        console.log(uploadedResponse)
        res.send(uploadedResponse)
    } catch (error) {
        console.error(error)
    }
}

exports.deleteFile = async (req, res) => {
    try {
        console.log(req.body)
        const public_id = req.body.public_id
        console.log(public_id)
        const response = await cloudinary.uploader.destroy(public_id);
        res.send(response)
    } catch (error) {
        console.error(error)
    }
}
const formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



exports.uploadFile = (req,res) => {
        // parse a file upload
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            // console.log("FILE PATH")
            // console.log(files);
            cloudinary.uploader.upload(files.image.filepath, result => {

                
                // console.log("Result Came Back")
                // console.log(result)
                // if (result.public_id) {
                

                // }
                return res.status(200).send({message: "Image Uploaded", url: result.url});
            });
        });
        return;
}

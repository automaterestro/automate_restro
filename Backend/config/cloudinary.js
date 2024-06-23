const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (file) => {
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    //uploading to cloudinary
    const options = {};
    options.resource_type = "auto";

    const ans = await cloudinary.uploader.upload(file.tempFilePath, options);
    return ans;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = uploadToCloudinary;

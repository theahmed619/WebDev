import cloudinary from '../config/cloudinaryConfig.js';

export const getCloudinarySignature = (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'Projora'; 
    
    // 1. Get the resource_type from the frontend's query
    const resource_type = req.query.resource_type || 'auto';
    const api_key = process.env.CLOUDINARY_API_KEY;

    // 2. Create the parameters that will be signed
    const paramsToSign = {
      timestamp: timestamp,
      folder: folder,
    };

    // 3. Create the signature using the new params
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    // 4. Send all signed parameters back to the client
    res.status(200).json({ timestamp, signature, folder, resource_type });

  } catch (error) {
    res.status(500).json({
      message: 'Server error while generating signature.',
      error: error.message,
    });
  }
};
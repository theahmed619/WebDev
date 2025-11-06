import cloudinary from '../config/cloudinaryConfig.js';

/**
 * @route   GET /api/cloudinary/signature
 * @desc    Get a secure signature for client-side upload
 * @access  Private (Admin)
 */
export const getCloudinarySignature = (req, res) => {
  try {
    // Get the current timestamp (in seconds)
    const timestamp = Math.round(new Date().getTime() / 1000);

    // This is the folder your files will be forced into
    const folder = 'MemeHub'; // Or 'fantastic' like your v1

    // Create the signature
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    // Send the signature and timestamp back to the client
    res.status(200).json({ timestamp, signature, folder });

  } catch (error) {
    res.status(500).json({
      message: 'Server error while generating signature.',
      error: error.message,
    });
  }
};
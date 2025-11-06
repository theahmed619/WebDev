import axios from "axios";
import toast from 'react-hot-toast'; // Import toast for error handling

/**
 * A helper function to upload a file to Cloudinary using a backend signature.
 * @param {File} file - The file object from an <input type="file">
 * @returns {Promise<object|null>} - An object with { public_id, url } or null if it fails.
 */
export const uploadToCloudinary = async (file) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token not found. Please log in again.");
    return null;
  }

  // --- Step 1: Get the signature from your backend ---
  let signatureData;
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/cloudinary/signature`,
      {
        headers: {
          // --- THIS IS THE FIX ---
          // Send the token in a header named 'token'
          // to match your isAuth.js middleware
          token: token,
        },
      }
    );
    signatureData = data;
  } catch (error) {
    console.error("Error getting upload signature:", error);
    toast.error("Error getting upload permission from server.");
    return null;
  }

  // --- Step 2: Prepare the FormData for Cloudinary ---
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
  formData.append("timestamp", signatureData.timestamp);
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);

  // --- Step 3: Upload the file directly to Cloudinary ---
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  try {
    const { data: cloudinaryData } = await axios.post(uploadUrl, formData);

    // --- Step 4: Return the data your createBlog controller needs ---
    return {
      public_id: cloudinaryData.public_id,
      url: cloudinaryData.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    toast.error("File upload to Cloudinary failed.");
    return null;
  }
};
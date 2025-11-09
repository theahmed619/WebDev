import axios from "axios";
import toast from "react-hot-toast";

/**
 * A helper function to upload a file to Cloudinary using a backend signature.
 * @param {File} file - The file object from an <input type="file">
 * @param {string} resource_type - The type of file ('image', 'video', or 'raw')
 * @returns {Promise<object|null>} - An object with { public_id, url } or null if it fails.
 */

export const uploadToCloudinary = async (file, resource_type = "auto") => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token not found. Please log in again.");
    return null;
  }

  // --- Step 1: Get signature, passing resource_type to be signed ---
  let signatureData;
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/cloudinary/signature`,
      { 
        headers: { token: token },// Send type to be signed
      }
    );
    signatureData = data;
  } catch (error) {
    console.error("Error getting upload signature:", error);
    toast.error("Error getting upload permission from server.");
    return null;
  }

  // --- Step 2: Prepare FormData ---
  const formData = new FormData();
  formData.append("file", file);
  formData.append("timestamp", signatureData.timestamp);
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);
  formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
  
  // --- IMPORTANT ---
  // DO NOT append api_key. This invalidates the signature.
  
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resource_type}/upload`;

  try {
    const { data: cloudinaryData } = await axios.post(uploadUrl, formData);
    return {
      public_id: cloudinaryData.public_id,
      url: cloudinaryData.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    toast.error(`File upload to Cloudinary failed. (${error.message})`);
    return null;
  }
};
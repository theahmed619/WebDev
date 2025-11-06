import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    fid: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },

    // --- All media is optional ---

    blogImage: {
      public_id: {
        type: String,
        // required: true, // --- REMOVE THIS ---
      },
      url: {
        type: String,
        // required: true, // --- REMOVE THIS ---
      },
    },

    blogVideo: {
      public_id: {
        type: String,
        // required: true, // --- REMOVE THIS ---
      },
      url: {
        type: String,
        // required: true, // --- REMOVE THIS ---
      },
    },

    blogReel: {
      public_id: {
        type: String,
        // required: true, // --- REMOVE THIS ---
      },
      url: {
        type: String,
        // required: true, // --- REMOVE THIS ---
      },
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
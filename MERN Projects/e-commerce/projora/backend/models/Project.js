import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String], // An array of strings
      required: false, // Or true, if you want to force it
    },
    price: {
      type: Number,
      required: true,
    },
    liveDemoUrl: {
      type: String,
      required: true,
    },

    // --- Project Media ---

    // An array for multiple screenshots
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    // The single demo video
    demoVideo: {
      public_id: { type: String },
      url: { type: String },
    },

    // --- The Digital Product ---
    // This is the ZIP file (uploaded to Cloudinary as 'raw')
    // productFile: {
    //   public_id: { type: String, required: true },
    //   url: { type: String, required: true },
    // },
    productFile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
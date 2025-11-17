import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://theahmed298:HHwOym5tBloTjFfm@nextauth.emfugag.mongodb.net/",
      {
        dbName: "authapp",
      }
    );

    console.log("MongoDb Connected Successfully");
  } catch (error) {
    console.log("error in mongodb", error.message);
  }
};

export default connectDB;

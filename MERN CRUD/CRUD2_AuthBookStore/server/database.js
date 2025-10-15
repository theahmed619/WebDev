const mongoose = require("mongoose");

const databaseConnection =  () => {
  mongoose
    .connect("mongodb://localhost:27017/bookstore")
    .then(() => {
      console.log("Database connection connected successfully");
    })
    .catch((err) => {
      console.log(`Database connection failed`, err);
    });
};

module.exports= databaseConnection;
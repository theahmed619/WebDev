import express from "express";
import mongoose from "mongoose";
import { Contact } from "./ContactModel.js";
import bodyParser from "express";
import cors from "cors";

const app = express();

//app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect("mongodb+srv://ahmed29:ahmed29@cluster0.nzngy0z.mongodb.net/", {
    dbName: "CRUD1",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// get all contacts
app.get("/home", (req, res) => {
  res.json({ message: "Home Route" });
});

app.get("/getcontact", async (req, res) => {
  try {
    let contact = await Contact.find().sort({createdAt:-1});
    res.json({ message: "All contacts", contact });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// add contact
app.post("/add", async (req, res) => {
  try {
    const { name, gmail, phone } = req.body;
    let contact = await Contact.findOne({ gmail });
    if (contact) return res.json({ message: "Contact already exist" });
    contact = await Contact.create({ name, gmail, phone });
    res.json({ message: "Contact save successfully", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// edit contact
app.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    let contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Contact not found" });

    let data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Contact has been updated ", data });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// delete contact

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Contact not found" });

    await contact.deleteOne();
    res.json({ message: "Contact has been deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

const port = 2000;

app.listen(port, () => console.log(`server is running on port ${port}`));

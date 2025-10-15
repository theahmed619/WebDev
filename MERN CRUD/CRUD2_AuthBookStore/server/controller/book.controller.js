const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice ||
      !body.PublishDate
    ) {
      return res
        .status(400)
        .json({ Mesaage: "All fields are required", Success: false });
    }

    const bookAdd = await Book.insertOne(body);
    if (bookAdd) {
      return res.status(201).json({
        Mesaage: "Data Created Successfully",
        Success: true,
        Id: bookAdd._id,
      });
    }

    console.log("bookAdd", bookAdd);
  } catch (error) {
    return res.status(500).json({ Mesaage: error.message, Success: false });
  }
};

const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      Mesaage: "All books fetch successflly",
      Success: true,
      totalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookDeleteController = async (req, res) => {
  const body = req.body;
  try {
    const deleted = await Book.deleteOne({ _id: body.Id });

    console.log("deleted", deleted);

    if (deleted.acknowledged) {
      return res.status(200).json({
        Message: "Deleted successflly",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookUpdateController = async (req, res) => {
  try {
    const body = req.body;

    const updating = await Book.updateOne({ _id: body?.Id }, { $set: body });
    console.log("updating =", updating);
    if (updating.acknowledged) {
      return res.status(200).json({
        Message: "Updated successflly",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};

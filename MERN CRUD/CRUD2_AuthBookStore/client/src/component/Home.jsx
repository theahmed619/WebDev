import React, { useEffect } from "react";
import { useState } from "react";
import { bookBaseUrl } from "../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: " ",
    SellingPrice: "",
    PublishDate: "",
    Id:"",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllBookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklist");
      setBookList(data?.BookList);
      //  console.log('booklist',data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        if (
          !bookForm?.BookName ||
          !bookForm.BookTitle ||
          !bookForm.Author ||
          !bookForm.SellingPrice
        ) {
          alert("All fields are required");
        }

        const { data } = await bookBaseUrl.post("/addbook", bookForm);
        if (data?.Success) {
          alert(data?.Mesaage);
          getAllBookList();
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: " ",
            SellingPrice: "",
            PublishDate: "",

        
          });
        }
        //console.log(data);
      }else{
           const { data } = await bookBaseUrl.put("/updatebook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
           getAllBookList();
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: " ",
            SellingPrice: "",
            PublishDate: "",
            Id:"",
          });
          setIsUpdating(false);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("deletebook", {
        Id: id,
      });
      if (data?.Success) {
        alert(data?.Message);
        getAllBookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data) => {

    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?. PublishDate,
      Id:data?._id,
    });
    setIsUpdating(true);
  };

  return (
    <>
    <Navbar/>
    
     <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full  grid grid-cols-5 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border border-gray-100 rounded-sm outline-1 outline-gray-500  h-8 px-2 text-gray-"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border-2  border-gray-300 rounded-sm outline-none h-8 px-2 text-gray-"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full border-2  border-gray-300 rounded-sm outline-none h-8 px-2 text-gray-"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder="Selling price"
            className="w-full border-2  border-gray-300 rounded-sm outline-none h-8 px-2 text-gray-"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder="Publish Date"
            className="w-full border-2  border-gray-300 rounded-sm outline-none h-8 px-2 text-gray-"
            name="PublishDate"
            value={bookForm.PublishDate || ""}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-gray-700 text-white h-9 w-20 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full  bg-white divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800">
                  Book Title
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800">
                  Selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800">
                  Published Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white divide-y divide-gray-200 ">
              {bookList?.map((book, index) => {
                return (
                  <tr className="hover:bg-gray-200" key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookTitle}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.Author}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.SellingPrice}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.PublishDate}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap ">
                      <div className="w-20 flex justify-center gap-5 ">
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg cursor-pointer"
                          onClick={() => handleDelete(book._id)}
                        >
                          <span>
                            <MdDelete />
                          </span>
                        </div>

                        <div
                          className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg cursor-pointer"
                          onClick={() => handleUpdate(book)}
                        >
                          <span>
                            <FaPen />
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    </>
   
  );
};

export default Home;

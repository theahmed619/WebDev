import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AddContact = ({
  handleModal,
  showModal,
  url,
  reload,
  setReload,
  id,
  setId,
  contacts,
}) => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (id) {
      for (let i = 0; i < contacts.length; i++) {
        if (id === contacts[i]._id) {
          setName(contacts[i].name);
          setGmail(contacts[i].gmail);
          setPhone(contacts[i].phone);
          break;
        }
      }
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, gmail, phone);
   handleModal();

    if (id) {
      // edit data
      const api = await axios.put(
        `${url}/edit/${id}`,
        { name, gmail, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log("id= ", api);
    } else {
      // send data
      const api = await axios.post(
        `${url}/add`,
        { name, gmail, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("form submitted= ", api);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setReload(!reload);
    setName("");
    setGmail("");
    setPhone("");
    setId("");
    
    
  };

  return (
    <>
      <div className="container " style={{ width: "200px" }}>
        <button className="btn btn-warning mt-5" onClick={handleModal}>
          Add Contact
        </button>

        {/*  Modal code */}
        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            role="dailog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div
                className="modal-content bg-black text-white p-3"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-header d-flex justify-content-center align-item-center ">
                  <h3 className="text-center">
                    {" "}
                    {id ? "Edit Contact" : " Add Contact"}{" "}
                  </h3>
                </div>
                <div className="modal-body">
                  <form onSubmit={submitHandler} method="post">
                    <div className="mb-3">
                      <label htmlFor="exampleInputName1" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        aria-describedby="nameHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPhone1"
                        className="form-label"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPhone1"
                        aria-describedby="emailHelp"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-center align-item-center ">
                      {id ? (
                        <button type="submit" className="btn btn-primary">
                          Edit
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          ADD
                        </button>
                      )}

                      <button
                        type="submit"
                        className="btn btn-danger mx-3"
                        onClick={handleModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddContact;

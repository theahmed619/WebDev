import React from "react";
import axios from "axios";
import { ToastContainer, toast , Bounce} from "react-toastify";

const Contact = ({
  contacts,
  opacity,
  url,
  reload,
  setReload,
  setId,
  handleModal,
}) => {
  const blur = opacity ? "0.2" : "1";

  const deleteContact = async (id) => {
    const api = await axios.delete(`${url}/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("deleted data", api);
    toast.warn("Contact has been deleted!", {
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
    setReload(!reload);
  };

  return (
    <>
      <div
        className="container my-5"
        style={{ width: "700px", opacity: `${blur}` }}
      >
        {contacts.map((data) => (
          <div
            key={data._id}
            className="bg-black text-white p-3 my-3 "
            style={{
              borderRadius: "10px",
              border: "2px solid yellow",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2>{data.name}</h2>
              <h4>{data.gmail}</h4>
              <h4>{data.phone}</h4>
            </div>
            <div
              style={{
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  setId(data._id);
                  handleModal();
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteContact(data._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contact;

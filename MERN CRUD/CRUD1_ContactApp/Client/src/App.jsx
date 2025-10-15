import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import AddContact from "./AddContact";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const url = "http://localhost:2000";

  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await axios.get(`${url}/getcontact`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Data =", api.data);
        setContacts(api.data.contact);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reload]);

  const handleModal = () => {

      // If the modal is currently open and is about to be closed...
  if (showModal) {
    setId(""); // ...reset the id.
  }
    setShowModal(!showModal);
    setOpacity(!opacity);
  };

  //console.log("id for edit=",id)

  return (
    <>
<ToastContainer/>

      <AddContact
        handleModal={handleModal}
        showModal={showModal}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        setId={setId}
        contacts={contacts}
      />
      <Contact
        contacts={contacts}
        opacity={opacity}
        url={url}
        reload={reload}
        setReload={setReload}
        setId={setId}
        handleModal={handleModal}
      />
    </>
  );
};

export default App;

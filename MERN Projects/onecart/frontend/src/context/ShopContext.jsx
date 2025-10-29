import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";
import { userDataContext } from "./UserContext";


export const shopDataContext = createContext();
function ShopContext({ children }) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let { userData } = useContext(userDataContext);
  let [showSearch, setShowSearch] = useState(false);
  let { serverUrl } = useContext(authDataContext);

  let currency = "₹";
  let delivery_fee = 40;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };
  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  );
}

export default ShopContext;

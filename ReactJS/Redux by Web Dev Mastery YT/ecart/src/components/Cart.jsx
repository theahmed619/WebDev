import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, selectCartItems } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItems);
  console.log("cartItems=", cartItem);

  return (
    <>
          <ToastContainer />
      <div className="container my-5 text-center" style={{ width: "700px" }}>
        {cartItem.length == 0 && (
          <>
            <h1>Your Cart is Empty</h1>
            <Link to={"/"} className="btn btn-warning">
              Continue Shopping...
            </Link>
          </>
        )}

        {cartItem.map((item) => (
          <div key={item.id} className="container">
            <div
              className="card mb-3 bg-dark text-light text-center"
              style={{ width: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.imgSrc}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <button className="btn btn-primary mx-3">
                      {item.price} ₹
                    </button>
                    <button className="btn btn-warning">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cartItem.length != 0 && (
          <button
            onClick={() => {
              dispatch(clearCart());
              toast.success("Cart Cleared", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
            }}
            className="btn btn-warning col-md-6"
          >
            Clear Cart
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;

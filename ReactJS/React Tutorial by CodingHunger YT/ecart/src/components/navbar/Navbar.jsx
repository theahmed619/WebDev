import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { ThemeContext } from "../../context/ThemeContext"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

   const cartItem = useSelector((state)=>state.cart.cartItems);

  const handleOnChange = () => {
    toggleTheme();
  };

  return (
    <div
      className={[
        styles.navbar,
        theme === "light" ? styles.lightNavbar : styles.darkNavbar,
      ].join(" ")}
    >
      <div className={styles.navbarLeft}>
        <h1>ECart</h1>
        <input
          type="text"
          placeholder="Search Items"
          className={styles.inputSearchBox}
        />
      </div>

      <div className={styles.options}>
        <Link
          to={"/"}
          className={[
            styles.option,
            theme === "light" ? styles.optionLight : styles.optionDark,
            location.pathname === "/"
              ? theme === "light"
                ? styles.selectedOptionLight
                : styles.selectedOptionDark
              : "",
          ].join(" ")}
        >
          <h2>Home</h2>
        </Link>
        <Link
          to={"/cart"}
          className={[
            styles.option,
            theme === "light" ? styles.optionLight : styles.optionDark,
            location.pathname === "/cart"
              ? theme === "light"
                ? styles.selectedOptionLight
                : styles.selectedOptionDark
              : "",
          ].join(" ")}
        >
          <h2>Cart</h2>
          <div
            className={
              theme === "light" ? styles.lightCartNumber : styles.darkCartNumber
            }
          >
          {cartItem.length}
          </div>
        </Link>
        <label className={styles.switch}>
          <input type="checkbox" onChange={handleOnChange} />
          <span className={[styles.slider, styles.round].join(" ")}></span>
        </label>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { ThemeContext } from "../../../ThemeContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

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
            0
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

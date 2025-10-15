import React, { useContext } from "react";
import styles from "./Home.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import product from "../../utils/product.json";
import Card from "../Card/Card";
import recommendedItem from "../../utils/recommendedItem.json";
import RecCard from "../RecommendedCard/RecCard";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  // Create a reversed copy to avoid mutating the original product array
  const reversedProduct = [...product].reverse();

  return (
    <div
      className={[
        styles.home,
        theme === "light" ? styles.homeLight : styles.homeDark,
      ].join(" ")}
    >
      <div className={styles.bannerDiv}>
        <img
          className={styles.bannerImg}
          src="https://slidebazaar.com/wp-content/uploads/2021/09/product-banner-jpg.webp"
          alt="Product Banner" // Added alt text for accessibility
        />
      </div>

      <div className={styles.products}>
        <div>
          <h2>Trending Items</h2>
          <div className={styles.productHorizontalList}>
            {product.map((item) => {
              // FIX 1: Added key prop here
              return <Card key={item.id} theme={theme} item={item} />;
            })}
          </div>
        </div>

        <div>
          <h2>Recommended Items</h2>
          <div className={styles.recommendedBlock}>
            {recommendedItem.map((item) => {
              // FIX 2: Added key prop here
              return <RecCard key={item.id} theme={theme} item={item} />;
            })}
          </div>
        </div>

        <div>
          <h2>Trending Items</h2>
          <div className={styles.productHorizontalList}>
            {reversedProduct.map((item) => {
              // FIX 3: Added key prop here
              return <Card key={item.id} theme={theme} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
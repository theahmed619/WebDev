import React from 'react'
import styles from './Card.module.css'
const Card = ({ theme, item }) => {
  return (
         <div key={item.id} className={[styles.card, theme === "light" ? styles.cardLight : styles.cardDark].join(' ')}>
            <div className={styles.imageBlock} >
                <div to={`/detail/${item.id}`}>
                    <img className={styles.Image} src={item.imageLink} />
                </div>

            </div>

            <div className={theme === "light" ? styles.DescBlockLight : styles.DescBlockDark} >
                <h3>{item.productName}</h3>
                <p className={styles.itemDesc}>{item.shortDesc}</p>
                <div className={styles.detail}>
                    <div className={styles.price}>$ {item.price}</div>
                    <div className={theme === "light" ? styles.btnLight : styles.btnDark}   >Add To Cart</div>
                </div>
            </div>
        </div>
  )
}

export default Card
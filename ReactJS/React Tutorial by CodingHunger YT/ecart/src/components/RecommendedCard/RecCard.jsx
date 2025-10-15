import React from 'react'
import styles from './RecCard.module.css'

const RecCard = ({theme,item}) => {
  return (
    <div className={[styles.RecommendedCard,theme==="light"?styles.recommendedLight:styles.darkRecommended].join(' ')}>
        <img className={styles.recomImage} src={item.imageLink} />
        <h2 className={styles.productName}>{item.productName}</h2>
    </div>
  )
}

export default RecCard
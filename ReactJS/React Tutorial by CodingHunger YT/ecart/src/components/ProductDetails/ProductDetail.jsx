import React, { useContext, useEffect, useState } from 'react'
import styles from './productDetail.module.css'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import products from '../../utils/product.json';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const productDetail = () => {
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    const dispatch = useDispatch()

    const [data,setData] = useState(null);

    useEffect(()=>{
        let product = products.find((ids)=>ids.id===id)
        setData(product);
        
    },[id])

    return (
        <div className={[styles.productDetail, theme === 'light' ? styles.productDetailLight : styles.productDetailDark].join(' ')}>
            <div className={styles.productImage}>
                <img src={data?.imageLink} className={styles.Image} />
            </div>

            <div className={styles.productDetailBlock}>
                <h1>{data?.productName}</h1>
                <p style={{fontSize:"24px"}}> {data?.detailsDesc} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem exercitationem, quod facilis tempora nam, dolorum repellat culpa velit deserunt corrupti veniam atque dignissimos aut tempore modi. Minus consequuntur aliquam illo.</p>
                <h1 className={styles.itemPrice}>$ {data?.price}</h1>
                <div className={theme==='light'?styles.btnLight:styles.btnDark} onClick={()=>dispatch(addToCart(data))}>Add To Cart</div>
            </div>
        </div>
    )
}

export default productDetail
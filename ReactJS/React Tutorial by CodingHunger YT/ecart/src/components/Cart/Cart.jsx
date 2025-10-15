import React, { useContext } from 'react'
import styles from './Cart.module.css'
import { ThemeContext } from '../../context/ThemeContext'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromcart } from '../../redux/cartSlice';

const Cart = () => {
    const { theme } = useContext(ThemeContext);

    const cartItem = useSelector((state) => state.cart.cartItems);

    const TotalPrice = cartItem.reduce((total, item) => total + item.price, 0).toFixed(2);

    const dispatch = useDispatch();

    return (
        <div className={[styles.cartPage, theme === "light" ? styles.cartLight : styles.cartDark].join(' ')}>
            <h2>Cart Items</h2>
            <div className={styles.cartBlock}>

                {/* left side */}
                <div className={styles.cartItems}>

                    {
                        cartItem.map((item) => {
                            return (
                                <div className={[styles.cartItem, theme === 'light' ? styles.cartItemLight : styles.cartItemDark].join(' ')}>
                                    <img className={styles.CartImg} src={item.imageLink} />

                                    <div className={styles.productDetails}>
                                        <h2>{item.productName}</h2>
                                        <p>{item.detailsDesc}</p>
                                        <div className={styles.cartPriceBtn}>
                                            <h1>$ {item.price}</h1>
                                            <div className={styles.cartBtns}>
                                                <div className={theme === 'light' ? styles.cartBtnLight : styles.cartBtnDark} onClick={()=>dispatch(removeFromcart(item.id))} >Remove From Cart</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })
                    }

                    {
                        cartItem.length===0?<h1>No any Item in cart</h1> :null
                    }




                </div>


                {/* right side */}
                <div className={[styles.cartTotalBlock, theme === "light" ? styles.cartTotalLight : styles.cartTotalDark].join(' ')}>
                    <h2>Total Price </h2>
                    <h1>$ {TotalPrice}</h1>
                    <div className={theme === 'light' ? styles.placeOrderBtnLight : styles.placeOrderBtnDark}>Place Order</div>
                </div>
            </div>
        </div>
    )
}

export default Cart
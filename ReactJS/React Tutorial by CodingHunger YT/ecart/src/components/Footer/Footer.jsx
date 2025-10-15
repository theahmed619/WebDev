import React,{useContext} from 'react'
import styles from './Footer.module.css'
import { ThemeContext } from "../../context/ThemeContext"

const Footer = () => {
    const {theme} = useContext(ThemeContext);

  return (
    <div className={theme==='light'?styles.footerLight:styles.footerDark}>
        @ECart
    </div>
  )
}

export default Footer
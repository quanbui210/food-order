import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'


const HeaderCartButton = ({open}) => {
    const [btnIsBumped, setBtnIsBumped] = useState(false)
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx
    const numberOfCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0);
    const btnClasses =  `${classes.button} ${btnIsBumped ? classes.bump : ''}` 
    useEffect(() => {
        if (items.length === 0) {
            return;
        }   
        setBtnIsBumped(true)

        const timer = setTimeout(() =>{
            setBtnIsBumped(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return <button onClick={open} className={btnClasses}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;
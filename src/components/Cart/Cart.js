import classes from'./Cart.module.css';
import Modal from '../UI/Modal';
import  {useContext, useState, useRef, Fragment} from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout'
import prepareImg from '../../assets/prepare.jpg'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';


const Cart = props => {
    const [preparing, setPreparing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItem = cartCtx.items.length > 0 

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1})
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true)
        axios.post('https://food-order-5e13e-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            user: userData,
            orderedItems: cartCtx.items
        })
        setIsSubmitting(false)
        setSubmitted(true)
        cartCtx.clearCart()
    }

    const cartItems = <ul className={classes["cart-items"]}>
        {cartCtx.items.map( item => <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
        />)}
    </ul> 

    const cartModalContent = <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onSubmit={submitOrderHandler} setPrepare={setPreparing} onCancel={props.onClose}/>}
            {!isCheckout &&<div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>}
    </Fragment>

    const isSubmittingModal = <p>Sending Order Data...</p>

    const prepareUI = <Modal className={classes.prepareModal} onClose={props.onClose}>
        <CloseIcon style={{float: 'right', top: '0'}} onClick={props.onClose}/>
        <p className={classes.text}>Your Order is Being Prepared!</p>
        <img src={prepareImg} alt="" className={classes.img}/>
    </Modal>
        return (
        <Modal onClose={props.onClose}>
           {!isSubmitting && !submitted && cartModalContent}
           {isSubmitting && isSubmittingModal}
           {preparing && prepareUI}
        </Modal>
        )
    
}

export default Cart
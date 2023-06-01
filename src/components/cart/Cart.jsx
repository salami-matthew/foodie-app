import React, { useContext } from 'react'
import classes from "./Cart.module.css"
import Modal from '../UI/Modal'
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';

const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const cartitems = cartCtx.items

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <ul className={classes['cart-items']}>
        {cartitems?.map((item) => {
          return <CartItem
            key={item.id}
            amount={item.amount}
            name={item.name}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>
        {cartCtx.items.length > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
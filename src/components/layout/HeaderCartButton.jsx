import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../cart/CartIcon'
import classes from "./HeaderCartButton.module.css"
import { CartContext } from '../../contexts/CartContext';

const HeaderCartButton = (props) => {
  const [itemAdded, setItemAdded] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length > 0) {
      setItemAdded(true);
    }

    const timer = setTimeout(() => setItemAdded(false), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalItems]);

  return (
    <button onClick={props.onShowCart} className={`${classes.button} ${itemAdded ? classes.bump : ""}`}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Cart</span>
      <span className={classes.badge}>
        {totalItems}
      </span>
    </button>
  )
}

export default HeaderCartButton
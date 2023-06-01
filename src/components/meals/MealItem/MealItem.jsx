import React, { useContext } from 'react'
import classes from "./MealItem.module.css"
import MealItemForm from './MealItemForm'
import { CartContext } from '../../../contexts/CartContext'

const MealItem = (props) => {

  const cartCtx = useContext(CartContext);

  const addToCart = (amt) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amt
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCart} />
      </div>
    </li>
  )
}

export default MealItem
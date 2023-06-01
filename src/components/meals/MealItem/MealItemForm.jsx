import React, { useRef, useState } from 'react'
import classes from "./MealItemForm.module.css"
import Input from '../../UI/Input'

const MealItemForm = (props) => {

  const amtRef = useRef();
  const [amtIsValid, setAmtIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmt = (amtRef.current.value);
    if (
      enteredAmt.trim().length === 0 ||
      +enteredAmt < 1 ||
      +enteredAmt > 5
    ) {
      setAmtIsValid(false);
      return;
    } else {
      setAmtIsValid(true);
    }

    props.onAddToCart(+enteredAmt);

  }

  return (
    <form className={classes.form}>
      <Input
        ref={amtRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button onClick={submitHandler}>+ Add</button>
      {!amtIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm
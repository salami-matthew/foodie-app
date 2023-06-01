import React, { useReducer } from 'react'

export const CartContext = React.createContext();

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {

    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
    const itemsCopy = [...state.items];
    const itemsId = state.items.map(item => item.id);
    if (itemsId.includes(action.item.id)) {
      const newItems = itemsCopy.map(item => {
        if (item.id === action.item.id) {
          const updatedItem = {
            ...item, amount: item.amount + action.item.amount
          }
          return updatedItem;
        } else {
          return item;
        }
      })
      return {
        items: newItems,
        totalAmount: updatedTotalAmount
      }
    } else {
      const updatedItems = state.items.concat(action.item);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    }
    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount
    // }
  }

  if (action.type === 'REMOVE') {

    const selectedItem = state.items.filter(item => item.id === action.id);
    const updatedTotalAmount = state.totalAmount - selectedItem[0].price;
    let updatedItems;
    if (selectedItem[0].amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      updatedItems = state.items.map(item => {
        if (item.id === action.id) {
          return { ...item, amount: item.amount - 1 }
        } else { return item }
      });
    }


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState
}

export const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const value = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem
  }

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  );
}


import React from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'

const Backdrop = (props) => {
  return <div onClick={props.onCloseCart} className={classes.backdrop}></div>
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
};

const Modal = (props) => {

  const portalElement = document.getElementById('overlays');

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  )
}

export default Modal
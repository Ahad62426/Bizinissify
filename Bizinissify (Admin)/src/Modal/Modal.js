import React from 'react'
import './Modal.css'
import Modal from 'react-modal'
const Modal = ({ show , closeModalHandler }) => {

 
      return (
        <>
       <div className ={"modal-wrapper"} style = {{ opacity : show ? '1' : '0'}}>
            <div className={"modal-backdrop"} />

            <div className={"modal-box"}>
             <h1>jhhhhhhhhhhhhhhh</h1>
            </div>

        </div>  
       

        </>  
            
    )
   
   
};
export default Modal;

import React, { useEffect, useState } from "react";

const Modal = ({ children, Modal, showModal, setShowModal }) => {
  return (
    <>
      <div
        type="button"
        className=" w-max h-max"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {children}
      </div>
      {showModal ? (
        <div className="fixed flex justify-center items-center z-50 inset-0 w-screen h-screen">
          <div
            className=" w-full h-full absolute bg-black/20 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="  z-10">{Modal}</div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;

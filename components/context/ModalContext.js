import React from "react";

const ModalContext = React.createContext();

function ModalContextProvider({ children }) {
  const [modal, setModal] = React.useState({ open: false, content: "" });

  let setOpenModal = (content = "") => {
    if (content) {
      setModal({ open: true, content });
    }
  };

  return (
    <ModalContext.Provider value={[modal, setOpenModal]}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider, ModalContext };

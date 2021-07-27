import React from "react";
import { Modal } from "semantic-ui-react";

const ModalContext = React.createContext();

function ModalContextProvider({ children }) {
  const [modal, setModal] = React.useState({ open: false, content: "" });
  const popup = (content) => setModal({ open: true, content });

  return (
    <ModalContext.Provider value={popup}>
      <Modal
        onClose={() => setModal({ ...modal, open: false })}
        onOpen={() => setModal({ ...modal, open: true })}
        open={modal.open}
        header="Oops!"
        content={modal.content}
        actions={[{ content: "OK", positive: true }]}
      />
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider, ModalContext };

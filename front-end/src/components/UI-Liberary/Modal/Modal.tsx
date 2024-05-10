// Modal.tsx
import React, { ReactNode } from "react";
import "./Modal.scss";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;

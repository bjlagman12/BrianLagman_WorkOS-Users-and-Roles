import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import { useEffect } from "react";

type ToastBodyProps = {
  show: boolean;
  message: string;
  type: string;
  onClose: () => void;
};

export const ToastBar = ({ show, message, type, onClose }: ToastBodyProps) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <ToastContainer position="top-end" className="p-3" aria-live="polite">
      <Toast
        show={visible}
        onClose={handleClose}
        bg={type}
        autohide={type === "success"}
        delay={3500}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">
            {type === "success" ? "Success" : "Failed"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

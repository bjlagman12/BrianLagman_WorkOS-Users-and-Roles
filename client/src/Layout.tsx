import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useState, createContext } from "react";
import { ToastBar } from "./Components/ToastBar";
import "./styles.css";

// This context will be used to manage the toast state
// across the application. We use a context to avoid prop drilling
// and to provide a global state for the toast notifications.

export const ToastContext = createContext<{
  show: boolean;
  message: string;
  type: string;
  setToast: React.Dispatch<{ show: boolean; message: string; type: string }>;
} | null>(null);

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleSelect = (key: string | null) => {
    // Only navigate if key is not null
    if (key) {
      navigate(key);
    }
  };

  return (
    <ToastContext.Provider value={{ ...toast, setToast }}>
      <ToastBar
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={handleCloseToast}
      />
      <Container className="mt-4">
        <Tabs
          activeKey={location.pathname}
          defaultActiveKey={"/users"}
          onSelect={handleSelect}
          className="mb-3"
          justify
          transition
        >
          <Tab eventKey="/users" title="Users" />
          <Tab eventKey="/roles" title="Roles" />
        </Tabs>
        <Outlet />
      </Container>
    </ToastContext.Provider>
  );
};

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Tabs, Tab, Container } from "react-bootstrap";
import { ManageUsers as UsersPage } from "./Users/ManageUsers";
import { ManageRoles as RolesPage } from "./Roles/ManageRoles";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (key: string | null) => {
    // Only navigate if key is not null
    if (key) {
      navigate(key);
    }
  };

  return (
    <Container className="mt-4">
      <Tabs
        activeKey={location.pathname}
        defaultActiveKey={"users"}
        onSelect={handleSelect}
        className="mb-3"
      >
        <Tab eventKey="users" title="Users" />
        <Tab eventKey="roles" title="Roles" />
      </Tabs>
      <Outlet />
    </Container>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/users" />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />¯
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

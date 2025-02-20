import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ManageUsers from "./Users/ManageUsers";
import ManageRoles from "./Roles/ManageRoles";
import { Layout } from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/users" />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="roles" element={<ManageRoles />} />¯
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

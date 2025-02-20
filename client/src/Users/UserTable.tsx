import { useState } from "react";
import { Table, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import { User } from "../../../server/src/models/user";
import { getRoleNameById, formatDate } from "../utils";
import { DeleteUserModal } from "./DeleteUserModal";

type UserTableProps = {
  users: Array<User>;
};

export const UserTable = ({ users }: UserTableProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleShow = (userId: string) => {
    setShowModal(true);
    setSelectedUserId(userId);
  };

  return (
    <Container className="mt-4">
      <Table bordered hover>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.photo}
                  alt={`${user.first} ${user.last}`}
                  width="50"
                  height="50"
                />
              </td>
              <td>{`${user.first} ${user.last}`}</td>
              <td>{getRoleNameById(user.roleId)}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    variant="light"
                    bsPrefix="e-caret-hide"
                    id="dropdown-basic"
                    className="border-0"
                  >
                    <i className="bi bi-three-dots"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="#">Edit</Dropdown.Item> Not need for assignment according to Randal*/}
                    <Dropdown.Item href="#" onClick={() => handleShow(user.id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedUserId && (
        <DeleteUserModal
          userId={selectedUserId}
          showModal={showModal}
          onClose={handleClose}
        />
      )}
    </Container>
  );
};

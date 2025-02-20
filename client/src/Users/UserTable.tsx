import { useState } from "react";
import {
  Table,
  Container,
  Dropdown,
  ButtonGroup,
  Pagination,
} from "react-bootstrap";
import { User } from "../../../server/src/models/user";
import { getRoleNameById, formatDate } from "../utils";
import { DeleteUserModal } from "./DeleteUserModal";

type UserTableProps = {
  users: Array<User>;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const UserTable = ({
  users,
  totalPages,
  currentPage,
  setCurrentPage,
}: UserTableProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleShow = ({ id, name }: { id: string; name: string }) => {
    setShowModal(true);
    setSelectedUserId({ id, name });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <Table hover aria-labelledby="user-table">
        <thead>
          <tr>
            <th id="photo-header">Photo</th>
            <th id="name-header">Name</th>
            <th id="role-header">Role</th>
            <th id="joined-header">Joined</th>
            <th id="actions-header"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.photo}
                  alt={`image of ${user.first} ${user.last}`}
                  width="50"
                  height="50"
                  className="rounded-circle"
                  aria-label={`image of ${user.first} ${user.last}`}
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
                    aria-label="More actions for user"
                  >
                    <i className="bi bi-three-dots" aria-hidden="true"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu aria-labelledby="dropdown-basic">
                    <Dropdown.Item
                      href="#"
                      onClick={() =>
                        handleShow({
                          id: user.id,
                          name: `${user.first} ${user.last}`,
                        })
                      }
                      aria-label={`Delete user ${user.first} ${user.last}`}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination controls */}
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>

      {selectedUserId && (
        <DeleteUserModal
          userId={selectedUserId.id}
          userName={selectedUserId.name}
          showModal={showModal}
          onClose={handleClose}
        />
      )}
    </Container>
  );
};

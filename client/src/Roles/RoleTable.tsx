import { useState } from "react";
import { Table, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import { Role } from "../../../server/src/models/role";
import { getRoleNameById, formatDate } from "../utils";
import { UpdateRoleModal } from "./UpdateRoleModal";

type RoleTableProps = {
  roles: Array<Role>;
};

export const RoleTable = ({ roles }: RoleTableProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedRoleId(null);
  };

  const handleShow = (roleId: string) => {
    setSelectedRoleId(roleId);
    setShowModal(true);
  };

  const findRoleById = (id: string) => {
    const foundRoleId = roles.find((role) => role.id === id);
    if (!foundRoleId) {
      console.error(`Role with ID ${id} not found`);
      return false;
    }
    return foundRoleId.isDefault;
  };

  return (
    <Container className="mt-4">
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Default Role</th>
            <th>Description</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role: any) => (
            <tr key={role.id}>
              <td>{`${role.name}`}</td>
              <td>{`${role.isDefault}`}</td>
              <td>{`${role.description}`}</td>
              <td>{formatDate(role.updatedAt)}</td>
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
                    <Dropdown.Item href="#" onClick={() => handleShow(role.id)}>
                      Edit
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedRoleId && (
        <UpdateRoleModal
          roleId={selectedRoleId}
          isDefault={findRoleById(selectedRoleId)}
          showModal={showModal}
          onClose={handleClose}
        />
      )}
    </Container>
  );
};

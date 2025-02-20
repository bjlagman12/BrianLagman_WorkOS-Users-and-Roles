import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateRole } from "../api";
import Form from "react-bootstrap/Form";

type UpdateRoleModalProps = {
  roleId: string;
  isDefault: boolean;
  showModal: boolean;
  onClose: () => void;
};

export const UpdateRoleModal = ({
  roleId,
  isDefault,
  showModal,
  onClose,
}: UpdateRoleModalProps) => {
  const queryClient = useQueryClient();
  const mutateUpdateRole = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: { name: string; description: string; isDefault: boolean };
    }) => updateRole(id, updatedData), // Call updateRole correctly
    onSuccess: () => {
      // Refetch users or update the cache by removing the deleted user
      queryClient.invalidateQueries({ queryKey: ["roles"] }); // Refetch users
    },
    onError: (error) => {
      // Optionally, you can show an error message or perform other actions
      console.error("Error deleting user:", error);
    },
    onSettled: () => {
      // Optionally, you can show a success message or perform other actions
      onClose(); // Close the modal after deletion
    },
  });

  const {
    mutate: handleUpdate,
    isError,
    isSuccess,
    isPending,
  } = mutateUpdateRole;

  const handleUpdateRole = (
    roleId: string,
    newRoleData: { name: string; description: string; isDefault: boolean }
  ) => {
    return handleUpdate({ id: roleId, updatedData: newRoleData });
  };

  const [validated, setValidated] = useState(false);
  const [newRoleName, setRoleName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevents the default form submission
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Stops the event from propagating up the DOM tree
    } else {
      if (!newRoleName.trim()) {
        console.error("Role name cannot be empty");
        return;
      }
      handleUpdateRole(roleId, {
        name: newRoleName,
        description: "",
        isDefault,
      });
    }
    setValidated(true);
  };

  return (
    <Modal show={showModal} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Role</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit} className="mb-4">
        <Modal.Body>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}{" "}
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

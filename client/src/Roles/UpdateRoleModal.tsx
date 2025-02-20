import { useContext, useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateRole } from "../api";
import Form from "react-bootstrap/Form";
import { ToastContext } from "../Layout";
import { AxiosError } from "axios";

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
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const queryClient = useQueryClient();
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error(
      "DeleteUserModal must be used within a ToastContext Provider"
    );
  }
  const { setToast } = toastContext;

  const mutateUpdateRole = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: { name: string; description: string; isDefault: boolean };
    }) => updateRole(id, updatedData), // Call updateRole correctly
    onSuccess: async () => {
      // Refetch roles after updated current role
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
      setToast({
        show: true,
        message: "Role updated successfully",
        type: "success",
      });
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        if (
          error.response &&
          error.response.data &&
          typeof (error.response.data as any).message === "string"
        ) {
          console.error(
            "Error deleting user:",
            (error.response.data as any).message
          );
          // Want to show menaing full error messages here provided by server
          setToast({
            show: true,
            message:
              (error.response.data as any).message || "Failed to update role",
            type: "danger",
          });
        }
      }
    },
    onSettled: () => {
      onClose();
    },
  });

  const { mutate: handleUpdate, isPending } = mutateUpdateRole;

  const handleUpdateRole = (
    roleId: string,
    newRoleData: { name: string; description: string; isDefault: boolean }
  ) => {
    return handleUpdate({ id: roleId, updatedData: newRoleData });
  };

  const [validated, setValidated] = useState(false);
  const [newRoleName, setRoleName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!newRoleName.trim()) {
      setValidated(true);
      return;
    }
    handleUpdateRole(roleId, {
      name: newRoleName,
      description: "",
      isDefault,
    });
  };

  return (
    <Modal show={showModal} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Role</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit} className="mb-4">
        <Modal.Body>
          <Form.Group controlId="search">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              ref={searchInputRef}
              placeholder="Enter new role name..."
              onChange={(e) => setRoleName(e.target.value)}
              required
              isInvalid={validated}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a role name.
            </Form.Control.Feedback>
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

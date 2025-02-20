import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api";
import { useContext, useState } from "react";
import { ToastBar } from "../Components/ToastBar";
import { ToastContext } from "../Layout";

type DeleteUserModalProps = {
  userId: string;
  userName: string;
  showModal: boolean;
  onClose: () => void;
};

export const DeleteUserModal = ({
  userId,
  userName,
  showModal,
  onClose,
}: DeleteUserModalProps) => {
  const queryClient = useQueryClient();
  // Get the toast context
  // This context will be used to manage the toast state
  const toastContext = useContext(ToastContext);

  // Check if the toast context is available. If not, throw an error
  if (!toastContext) {
    throw new Error(
      "DeleteUserModal must be used within a ToastContext Provider"
    );
  }

  const { setToast } = toastContext;

  const mutateDeleteUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] }); // Wait for users to refresh
      setToast({
        show: true,
        message: "User deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      setToast({
        show: true,
        message: "Failed to delete user",
        type: "danger",
      });
    },
    onSettled: () => {
      onClose();
    },
  });

  const { mutate: handleDelete, isPending } = mutateDeleteUser;

  return (
    <Modal
      show={showModal}
      onHide={onClose}
      centered
      aria-labelledby="delete-user-modal-title"
      aria-describedby="delete-user-modal-description"
    >
      <Modal.Header closeButton>
        <Modal.Title id="delete-user-modal-title">Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body id="delete-user-modal-description">
        Are you sure you want to delete <strong>{userName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          aria-label="Cancel delete"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => handleDelete(userId)}
          disabled={isPending}
          aria-label={`Delete ${userName}`}
        >
          {isPending && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}{" "}
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

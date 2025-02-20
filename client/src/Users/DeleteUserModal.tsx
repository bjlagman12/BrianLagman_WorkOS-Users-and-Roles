import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api";

type DeleteUserModalProps = {
  userId: string;
  showModal: boolean;
  onClose: () => void;
};

export const DeleteUserModal = ({
  userId,
  showModal,
  onClose,
}: DeleteUserModalProps) => {
  const queryClient = useQueryClient();
  const mutateDeleteUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Refetch users or update the cache by removing the deleted user
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refetch users
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
    mutate: handleDelete,
    isError,
    isSuccess,
    isPending,
  } = mutateDeleteUser;

  return (
    <Modal show={showModal} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleDelete(userId)}>
          {isPending && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}{" "}
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

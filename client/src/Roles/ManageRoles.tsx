import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api";
import { RoleTable } from "./RoleTable";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { LoadingState } from "../Components/LoadingState";

const ManageRoles = () => {
  const {
    data: roleListData,
    isLoading,
    isError,
    refetch: refetchRoles,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError) {
    return (
      <Alert key="danger" variant="danger" role="alert">
        There was an error loading roles. Please trying again.
        <Button
          variant="secondary"
          onClick={() => refetchRoles()}
          aria-label="Retry loading roles"
          size="sm"
          className="ms-2"
        >
          Reload roles
        </Button>
      </Alert>
    );
  }

  return <RoleTable roles={roleListData.data} />;
};

export default ManageRoles;

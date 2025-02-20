import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api";
import { RoleTable } from "./RoleTable";

export const ManageRoles = () => {
  const {
    data: roleListData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return <RoleTable roles={roleListData.data} />;
};

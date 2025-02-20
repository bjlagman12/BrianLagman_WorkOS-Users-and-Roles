import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";
import { UserTable } from "./UserTable";
import Form from "react-bootstrap/Form";
import { useDebouncedCallback } from "use-debounce";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "../Components/LoadingState";

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents the default form submission
    event.preventDefault();
  };

  // Debounce the search query to avoid too many API calls when the user is typing
  const debouncedSearchQuery = useDebouncedCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1000);

  const {
    data: userListData,
    isLoading,
    isFetching,
    isError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", searchQuery, currentPage],
    queryFn: () => getUsers(searchQuery, currentPage),
  });

  return (
    <div>
      <Form noValidate onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="search">
          <Form.Label hidden>Search by name</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              autoFocus
              placeholder="Search by name..."
              onChange={(e) => debouncedSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Form>

      {/* Show Error Message if Query Fails */}
      {isError && (
        <Alert key="danger" variant="danger" role="alert">
          There was an error loading users. Please try again.
          <Button
            variant="secondary"
            onClick={() => refetchUsers()}
            aria-label="Retry loading users"
            size="sm"
            className="ms-2"
          >
            Reload users
          </Button>
        </Alert>
      )}

      {/* Show Loading While Fetching */}
      {isLoading || isFetching ? (
        <LoadingState />
      ) : userListData && userListData?.data.length === 0 ? (
        <EmptyState />
      ) : (
        <UserTable
          users={userListData?.data}
          totalPages={userListData.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ManageUsers;

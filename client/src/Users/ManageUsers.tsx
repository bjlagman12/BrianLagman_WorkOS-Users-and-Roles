import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";
import { UserTable } from "./UserTable";
import Form from "react-bootstrap/Form";
import { useDebouncedCallback } from "use-debounce";

export const ManageUsers = () => {
  const [validated, setValidated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Stops the event from propagating up the DOM tree
    }
    setValidated(true);
  };

  const debouncedSearchQuery = useDebouncedCallback((value) => {
    setSearchQuery(value);
  }, 1000);

  const {
    data: userListData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const filteredUsers = userListData.data.filter((user: any) => {
    if (!searchQuery) {
      return true; // If no search query, show all users
    }
    return (
      user.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mb-4"
      >
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            onChange={(e) => debouncedSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Form>
      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
};

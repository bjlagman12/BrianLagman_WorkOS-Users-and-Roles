import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api';

export const ManageUsers = () => {
  const { data: userListData, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  console.log('User List Data:', userListData);

  return (
    <div>
      <h1>Manage Users</h1>
    </div>
  );
}
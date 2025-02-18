import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getUsers } from './api';

export const ManageDashboard = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['users'],
      queryFn: getUsers,
    });
    console.log('Data:', data);
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;
  
    return (
    <div>test</div>
    );
  };
  
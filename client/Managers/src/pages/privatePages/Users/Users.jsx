import { useEffect, useState } from "react";
import useFetchGet from "../../../hooks/useFetchGet";
import axios from "axios";
import { Box, Flex, Spinner } from "@chakra-ui/react";

const users_url = `${import.meta.env.VITE_URL}/users/getAllForManager`;

// import.meta.env.VITE_USERS_URL - this is how to import env variables in Vite

const Users = () => {
  const [users, setUsers] = useState([]);

  const [data, loading, error] = useFetchGet(users_url,
    // {Authorization: `Bearer ${cookies.token}`}
  );


  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  if (loading) {
    return <Flex w='100%' h='100vh' justifyContent='center' alignItems='center'><Spinner size='xl' /></Flex>;
  }

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        {error.message}
      </Alert>
    )
  }

  return (
    <div>
      {users && users.map((user) => (
        <div key={user._id}>{user.username}</div>
      ))}
    </div>
  )
}

export default Users
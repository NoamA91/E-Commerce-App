import { useEffect, useState } from "react";
import useFetchGet from "../../../hooks/useFetchGet";
import axios from "axios";
import { Alert, AlertIcon, Flex, Spinner } from "@chakra-ui/react";
import UsersTable from "../../../components/partials/users/UsersTable"
const users_url = `${import.meta.env.VITE_SERVER_URL}/users/getAllForManager`;

// import.meta.env.VITE_USERS_URL - this is how to import env variables in Vite

const Users = () => {
  const [users, setUsers] = useState([]);

  const [data, loading, error] = useFetchGet(users_url);


  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  if (loading) {
    return (
      <Flex
        w='100%'
        h='100vh'
        justifyContent='center'
        alignItems='center'
      >
        <Spinner size='xl' />
      </Flex>
    )
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
    <>
      {users && (
        <UsersTable users={users} />
      )}
    </>
  )
}

export default Users
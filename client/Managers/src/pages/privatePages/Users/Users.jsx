// import { useEffect, useState } from "react";
// import useFetchGet from "../../../hooks/useFetchGet";
// import { Alert, AlertIcon, Flex, Spinner } from "@chakra-ui/react";
// import UsersTable from "../../../components/partials/users/UsersTable"

// const users_url = `${import.meta.env.VITE_SERVER_URL}/users/managers/getAllForManager`;

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   const [data, loading, error] = useFetchGet(users_url);

//   useEffect(() => {
//     if (data) {
//       setUsers(data.users);
//     }
//   }, [data]);

//   if (loading) {
//     return (
//       <Flex
//         w='100%'
//         h='100vh'
//         justifyContent='center'
//         alignItems='center'
//       >
//         <Spinner size='xl' />
//       </Flex>
//     )
//   }

//   if (error) {
//     return (
//       <Alert status='error'>
//         <AlertIcon />
//         {error.message}
//       </Alert>
//     )
//   }

//   return (
//     <>
//       {users && (
//         <UsersTable users={users} />
//       )}
//     </>
//   )
// }

// export default Users

import { useEffect, useState } from "react";
import useFetchGet from "../../../hooks/useFetchGet";
import { Alert, AlertIcon, Flex, Spinner, useToast } from "@chakra-ui/react";
import UsersTable from "../../../components/partials/users/UsersTable"
import axios from "axios";

const users_url = `${import.meta.env.VITE_SERVER_URL}/users/managers/getAllForManager`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [data, loading, error] = useFetchGet(users_url);
  const toast = useToast();

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/managers/deleteUserByIdForManager/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      toast({
        title: 'Delete User',
        description: "The user has been deleted successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      data.users = data.users.filter((user) => user._id !== id);
      setUsers(data.users);

    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

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
        <UsersTable users={users} handleUserAdded={handleUserAdded} deleteUser={deleteUser} />
      )}
    </>
  )
}

export default Users;

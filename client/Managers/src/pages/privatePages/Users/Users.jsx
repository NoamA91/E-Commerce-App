import { useEffect, useState } from "react";
import useFetchGet from "../../../hooks/useFetchGet";
import axios from "axios";

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
    return <span>loading...</span>;
  }

  if (error) {
    return <span>{error.message}</span>;
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
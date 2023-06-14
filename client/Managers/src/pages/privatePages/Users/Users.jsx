import { useEffect, useState } from "react";
import useFetchGet from "../../../hooks/useFetchGet";

const users_url = "http://localhost:3000/users/getAllForManager";


const Users = () => {
  const [users, setUsers] = useState([]);

  const [data, loading, error] = useFetchGet(users_url, 
    // {Authorization: `Bearer ${cookies.token}`}
    );

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      console.log(users);
    }
  }, [data]);

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    return <span>{error.message}</span>;
  }
  
  return (
    <div>Users</div>
  )
}

export default Users
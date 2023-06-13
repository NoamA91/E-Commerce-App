import { Outlet } from "react-router-dom";
import Sidebar from "../components/sections/Sidebar/Sidebar";

function Root() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Root;

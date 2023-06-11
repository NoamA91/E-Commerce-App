import { Outlet } from "react-router-dom";
import SidebarWithHeader from '../components/sections/SidebarWithHeader';

function Root() {


    return (
        <>
            <SidebarWithHeader />
            <Outlet />
        </>
    );
}

export default Root
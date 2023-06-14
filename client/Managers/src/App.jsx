import { lazy } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "./pages/Root";

const Dashboard = lazy(() => import("./pages/privatePages/dashboard/Dashboard"))
import Users from "./pages/privatePages/Users/Users";
import Products from "./pages/privatePages/Products/Products";
import Orders from "./pages/privatePages/Orders/Orders";
import Login from "./pages/publicPages/Login";
import NotFoundPage from "./pages/privatePages/NotFoundPage";




function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        {/* <Route index element={<Login logged={isAuthenticated} />} /> */}

        <Route path='/dashboard'>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path='/users'>
          <Route index element={<Users />} />
        </Route>

        <Route path='/products'>
          <Route index element={<Products />} />
        </Route>

        <Route path='/orders'>
          <Route index element={<Orders />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
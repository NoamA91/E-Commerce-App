import { lazy, useContext } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import PrivateRoutes from "./utils/PrivateRoutes";
import AuthContext from "./contexts/AuthContext";

const Root = lazy(() => import("./pages/Root"))
const Users = lazy(() => import("./pages/privatePages/Users/Users"))
const EditUser = lazy(() => import("./pages/privatePages/Users/EditUser"))
const Dashboard = lazy(() => import("./pages/privatePages/dashboard/Dashboard"))
const Products = lazy(() => import("./pages/privatePages/Products/Products"))
const Categories = lazy(() => import("./pages/privatePages/categories/Categories"))
const EditCategory = lazy(() => import("./components/partials/categories/EditCategory"))
const Orders = lazy(() => import("./pages/privatePages/Orders/Orders"))
const Login = lazy(() => import("./pages/publicPages/Login"))
const NotFoundPage = lazy(() => import("./pages/privatePages/NotFoundPage"))



function App() {
  const { isAuthenticated } = useContext(AuthContext.AuthContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Login logged={isAuthenticated} />} />

        <Route element={<PrivateRoutes logged={isAuthenticated} />}>

          <Route path='/dashboard'>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path='/users'>
            <Route index element={<Users />} />
            <Route path="edit-user/:user_id" element={<EditUser />} />
          </Route>

          <Route path='/categories'>
            <Route index element={<Categories />} />
            <Route path="edit-category/:category_id" element={<EditCategory />} />
          </Route>

          <Route path='/products'>
            <Route index element={<Products />} />
          </Route>

          <Route path='/orders'>
            <Route index element={<Orders />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App;
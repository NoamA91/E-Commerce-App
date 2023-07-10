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
const Users = lazy(() => import("./pages/private/Users/Users"))
const EditUser = lazy(() => import("./pages/private/Users/EditUser"))
const Dashboard = lazy(() => import("./pages/private/dashboard/Dashboard"))
const Products = lazy(() => import("./pages/private/Products/Products"))
const EditProduct = lazy(() => import("./pages/private/Products/EditProduct"))
const Categories = lazy(() => import("./pages/private/categories/Categories"))
const EditCategory = lazy(() => import("./pages/private/categories/EditCategory"))
const Orders = lazy(() => import("./pages/private/Orders/Orders"))
const OrderDetails = lazy(() => import("./pages/private/Orders/OrderDetails"))
const Login = lazy(() => import("./pages/public/Login"))
const NotFoundPage = lazy(() => import("./pages/private/NotFoundPage"))



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
            <Route path="edit-product/:product_id" element={<EditProduct />} />
          </Route>

          <Route path='/orders'>
            <Route index element={<Orders />} />
            <Route path="order-details/:order_id" element={<OrderDetails />} />
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
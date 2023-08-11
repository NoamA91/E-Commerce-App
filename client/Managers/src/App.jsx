import { lazy, Suspense, useContext } from "react";
import LoadingSpinner from './components/LoadingSpinner'
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

        {/* Public Routes */}
        <Route index element={
          <Suspense fallback={<LoadingSpinner />}>
            <Login logged={isAuthenticated} />
          </Suspense>
        } />

        {/* Private Routes */}
        <Route element={<PrivateRoutes logged={isAuthenticated} />}>

          <Route path='/dashboard'>
            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            } />
          </Route>

          <Route path='/users'>
            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <Users />
              </Suspense>
            } />
            <Route path="edit-user/:user_id" element={
              <Suspense fallback={<LoadingSpinner />}>
                <EditUser />
              </Suspense>
            } />
          </Route>

          <Route path='/categories'>
            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <Categories />
              </Suspense>
            } />

            <Route path="edit-category/:category_id" element={
              <Suspense fallback={<LoadingSpinner />}>
                <EditCategory />
              </Suspense>
            } />
          </Route>

          <Route path='/products'>
            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <Products />
              </Suspense>
            } />

            <Route path="edit-product/:product_id" element={
              <Suspense fallback={<LoadingSpinner />}>
                <EditProduct />
              </Suspense>
            } />
          </Route>

          <Route path='/orders'>
            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <Orders />
              </Suspense>
            } />
            <Route path="order-details/:order_id" element={
              <Suspense fallback={<LoadingSpinner />}>
                <OrderDetails />
              </Suspense>
            } />
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
import { lazy, Suspense, useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthContext } from './context/AuthContext';


// pages
const Root = lazy(() => import('./pages/Root'));
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Products = lazy(() => import('./pages/public/products/Products'));
const Product = lazy(() => import('./pages/public/products/Product'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));

import PrivateRoutes from "./utils/PrivateRoutes";
const Profile = lazy(() => import('./pages/private/Profile'));
const Orders = lazy(() => import('./pages/private/Orders'));
const ChangePassword = lazy(() => import('./pages/private/ChangePassword'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const Checkout = lazy(() => import('./pages/private/Checkout'));
const OrderCompleted = lazy(() => import('./components/partials/checkout/OrderCompleted'));

function App() {
  const { user, setUser } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >

        {/*public routes*/}
        <Route index element={<Suspense fallback={
          <LoadingSpinner />}>
          <Home />
        </Suspense>
        } />

        <Route path="products" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        } />

        <Route path="product/:id" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Product />
          </Suspense>
        } />

        <Route path="about" element={
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        } />

        <Route path="contact" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        } />

        <Route path="login" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        } />

        <Route path="register" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        } />

        {/*private routes*/}
        <Route element={<PrivateRoutes />} user={user}>
          <Route path="profile" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Profile
                user={user}
                setUser={setUser}
              />
            </Suspense>
          } />

          <Route path="orders" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Orders user={user} />
            </Suspense>
          } />

          <Route path="/change-password" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ChangePassword user={user} />
            </Suspense>
          } />

          <Route path="/checkout" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Checkout user={user} />
            </Suspense>
          } />

          <Route path="/order-completed" element={
            <Suspense fallback={<LoadingSpinner />}>
              <OrderCompleted user={user} />
            </Suspense>
          } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <ParallaxProvider>
      <RouterProvider router={router} />
    </ParallaxProvider>
  )
}

export default App

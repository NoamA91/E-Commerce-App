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
import React from 'react';

// pages
const Root = lazy(() => import('./pages/Root'));
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Products = lazy(() => import('./pages/public/products/Products'));
const Product = lazy(() => import('./pages/public/products/Product'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));
const ResetPassword = lazy(() => import('./pages/public/ResetPassword'));

import PrivateRoutes from "./utils/PrivateRoutes";
const Profile = lazy(() => import('./pages/private/Profile'));
const Orders = lazy(() => import('./pages/private/Orders'));
const ChangePassword = lazy(() => import('./pages/private/ChangePassword'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const Checkout = lazy(() => import('./pages/private/Checkout'));
const OrderCompleted = lazy(() => import('./components/partials/checkout/OrderCompleted'));

function App() {
  const { user, setUser } = useContext(AuthContext);
  const routes = [
    // Public routes
    {
      path: '/',
      element: <Home />,
      isIndex: true,
      isPrivate: false
    },
    {
      path: 'products',
      element: <Products />,
      isIndex: false,
      isPrivate: false
    },
    {
      path: 'product/:id',
      element: <Product />,
      isIndex: false,
      isPrivate: false
    },
    {
      path: 'about',
      element: <About />,
      isIndex: false,
      isPrivate: false
    },
    {
      path: 'contact',
      element: <Contact />,
      isIndex: false,
      isPrivate: false
    },
    {
      path: 'login',
      element: <Login />,
      isIndex: false,
      isPrivate: false
    },
    {
      path: 'register',
      element: <Register />,
      isIndex: false,
      isPrivate: false
    },
    {
      path: 'reset-password',
      element: <ResetPassword />,
      isIndex: false,
      isPrivate: false
    },
    // Private routes
    {
      path: 'profile',
      element: <Profile />,
      isIndex: false,
      isPrivate: true,
      user,
      setUser
    },
    {
      path: 'orders',
      element: <Orders />,
      isIndex: false,
      isPrivate: true,
      user
    },
    {
      path: 'change-password',
      element: <ChangePassword />,
      isIndex: false,
      isPrivate: true,
      user
    },
    {
      path: 'checkout',
      element: <Checkout />,
      isIndex: false,
      isPrivate: true,
      user
    },
    {
      path: 'order-completed',
      element: <OrderCompleted />,
      isIndex: false,
      isPrivate: true
    },
  ]

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >

        {/* Public routes */}
        {routes.map((route) => {
          if (!route.isPrivate) {
            return (
              <Route
                key={route.path}
                path={route.isIndex ? '' : route.path}
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    {route.element}
                  </Suspense>
                } />
            )
          }
        })}

        {/* Private routes */}
        <Route element={<PrivateRoutes />} user={user}>
          {routes.map((route) => {
            if (route.isPrivate) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      {React.cloneElement(route.element, { user: route.user, setUser: route.setUser })}
                    </Suspense>
                  } />
              )
            }
          })}
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

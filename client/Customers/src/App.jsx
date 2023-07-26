import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

// pages
const Root = lazy(() => import('./pages/Root'));
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';
import LoadingSpinner from './components/LoadingSpinner';
const Products = lazy(() => import('./pages/public/products/Products'));
const Product = lazy(() => import('./pages/public/products/Product'));
const Login = lazy(() => import('./pages/public/Login'));

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
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
        <Route path="*" element={<NotFound />} />

        <Route path="login" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        } />
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

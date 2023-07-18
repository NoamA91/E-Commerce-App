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
// import Home from './pages/public/Home';
const Home = lazy(() => import('./pages/public/Home'));
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Blog from './pages/public/Blog';
import NotFound from './pages/public/NotFound';
import { Spinner } from '@chakra-ui/react';
import LoadingSpinner from './components/LoadingSpinner';
const Products = lazy(() => import('./pages/public/products/Products'));

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route index element={
          <Suspense fallback={
            <LoadingSpinner />
          }>
            <Home />
          </Suspense>

        } />
        <Route path="shop" element={
          <Suspense fallback={
            <LoadingSpinner />
          }>
            <Products />
          </Suspense>
        } />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
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

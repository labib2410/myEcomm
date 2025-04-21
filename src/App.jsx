import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Error404 from './components/Error404/Error404';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import SignUp from './components/SignUp/SignUp';
import UserContextProvider from './Context/UserContext/UserContext';
import SignIn from './components/SignIn/SignIn';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext/CartContext';
import Cart from './components/Cart/Cart';
import  { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';


let query = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute> <Checkout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute> <Orders /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute> <Categories /></ProtectedRoute> },
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <SignIn /> },
      { path: "*", element: <Error404 /> }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
        <Toaster />
        <ReactQueryDevtools/>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;

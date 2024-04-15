// import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Address from './Components/Address/Address';
import Allorders from './Components/Allorders/Allorders';
import CashOrder from './Components/CashOrder/CashOrder';
import Wishes from './Components/Wishes/Wishes';

let routers = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'cashorder', element: <ProtectedRoute><CashOrder /></ProtectedRoute> },
      { path: 'wishes', element: <ProtectedRoute><Wishes/></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '*', element: <Notfound /> }
    ]
  }
])
export default function App() {

  return <CartContextProvider>
    <UserContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </UserContextProvider>
    <Toaster />
  </CartContextProvider>
}
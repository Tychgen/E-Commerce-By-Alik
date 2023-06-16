import React, { useEffect } from 'react';
import { Routes, Route, useLocation} from "react-router-dom"
import Login from "../components/login components/Login"
import Products from '../pages/Products';
import Post from "../pages/Post"
import NavBar from "../components/layouts/Navbar"
import ShopCart from '../pages/ShopCart';
import Wishlist from './Wishlist';
import useProducts from '../components/data and hook components/data hook/useProducts';
import { setProductsSuccess } from '../store/store';
import { useDispatch} from 'react-redux';



const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const { isLoading, products } = useProducts();
  const dispatch = useDispatch();

  useEffect(()=>{
  if (!isLoading && products.length > 0) {
    dispatch(setProductsSuccess(products));
  }
}, [dispatch, isLoading, products]);


  
  return (
    <>
      
        {!isLoginPage && <NavBar />}
        <Routes>
          <Route index={true} element={<Login/>}/>
          <Route path="home" element={<Products/>}/>
          <Route path="/product/:id" element={<Post/>} />
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path="/cart" element={<ShopCart/>}/>
        </Routes>
     
    </>
  )
}

export default App
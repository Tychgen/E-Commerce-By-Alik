import React from 'react';
import { Routes, Route, useLocation} from "react-router-dom"
import Login from "../login components/Login"
import Products from '../products components/product component/Products';
import Post from "../products components/post component/Post"
import ShopContextProvider from '../data and function components/shop-context/ShopContext';
import NavBar from "../navbar components/NavBar"
import ShopCart from '../cart components/shop  cart component/ShopCart';
import Wishlist from '../wishlist components/Wishlist';


const Navigation = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      <ShopContextProvider>
        {!isLoginPage && <NavBar />}
        <Routes>
          <Route index={true} element={<Login/>}/>
          <Route path="home" element={<Products/>}/>
          <Route path="/product/:id" element={<Post/>} />
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path="/cart" element={<ShopCart/>}/>
        </Routes>
      </ShopContextProvider>
    </>
  )
}

export default Navigation
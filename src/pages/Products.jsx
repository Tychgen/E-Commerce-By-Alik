import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/product.css";
import Loading from '../components/loader components/Loader';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaHeart, FaMinus, FaExpand } from "react-icons/fa";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart,removeFromCart,addToWishlist,selectSearchTerm,selectCartItems,selectWishlist,setProductsSuccess,selectIsLoading,selectProducts, increaseQuantityTotal, decreaseQuantityTotal
} from '../store/store';
import useProducts from '../components/data and hook components/data hook/useProducts';


const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishlist = useSelector(selectWishlist);
  const searchTerm = useSelector(selectSearchTerm);
  const {isLoading, products} = useProducts();

  useEffect(() => {
    const initializeCartItems = (products) => {
      const cartItems = products.map((product) => ({
        id: product.id,
        quantity: 0,
      }));

      dispatch(addToCart(cartItems));
      dispatch(removeFromCart(cartItems));
    };

    if (!isLoading && products && products.length > 0) {
      initializeCartItems(products);
      dispatch(setProductsSuccess(products));
      dispatch(
        addToWishlist(
          products.map((product) => ({
            id: product.id,
            isWished: false,
          }))
        )
      );
    }
  }, [isLoading, products, dispatch]);


  if (isLoading) {
    return <Loading />;
  }

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    dispatch(increaseQuantityTotal());
  };
  
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    dispatch(decreaseQuantityTotal());
  };


  const filteredProducts = products ? products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3 className="">Featured Product</h3>
              <h2>Popular Products</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 col-xl-3 bg-dark">
              <div id={`product-${product.id}`} className="single-product product-1">
                <div className="part-1">
                  <br />
                  <NavLink to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </NavLink>
                  <ul>
                    <li>
                      <NavLink>
                        <button onClick={() => handleAddToCart(product.id)}>
                          <FaPlus />
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <button onClick={() => handleRemoveFromCart(product.id)}>
                          <FaMinus />
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                      <button onClick={() => dispatch(addToWishlist(product.id ))}>
                      {wishlist.find((item) => item.id === product.id)?.isWished ? (
                       <em className="heart">
                        <FaHeart color="red" />
                          </em>
                         ) : (
                           <FaHeart />
                           )}
                         </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/cart">
                        <AiOutlineShoppingCart />{' '}
                        {cartItems.find((item) => item.id === product.id)?.quantity}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/product/${product.id}`}>
                        <FaExpand />
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="part-2">
                  <h3 className="product-title rounded-pill bg-dark text-light fs-6 ps-2">
                    {product.title}
                  </h3>
                  <h4 className="product-price">
                    <span className="bg-danger border-secondary">${product.price}</span>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

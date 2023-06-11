import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "./styles/product.css";
import Loading from '../../loading components/Loading';
import { ShopContext } from '../../data and function components/shop-context/ShopContext';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaHeart, FaMinus, FaExpand } from "react-icons/fa";
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Products = () => {
  const { addToCart, cartItems, products, isLoading, removeFromCart, searchTerm, addToWishlist, wishlist } = useContext(ShopContext);

  if (isLoading) {
    return <Loading />;
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3 className=''>Featured Product</h3>
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
                        <button onClick={() => addToCart(product.id)}><FaPlus /></button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <button onClick={() => removeFromCart(product.id)}><FaMinus /></button>
                      </NavLink>
                    </li>
                    <li>
  <NavLink>
    <button onClick={() => addToWishlist(product.id)}>
      {wishlist.find((item) => item.id === product.id)?.isWished ? (
        <em className='heart'>
          <FaHeart color='red' />
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
                  <h3 className="product-title rounded-pill bg-dark text-light fs-6 ps-2">{product.title}</h3>
                  <h4 className="product-price"><span className='bg-danger border-secondary'>${product.price}</span></h4>
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
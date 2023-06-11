import React, { useContext } from 'react';

import CartItems from '../cart item component/CartItems';
import { ShopContext } from '../../data and function components/shop-context/ShopContext';
import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaShoppingCart, FaCcMastercard, FaCcVisa, FaCcAmex, FaCcPaypal, FaAngleDown } from "react-icons/fa"

const ShoppingCart = () => {
  const { addToCart, removeFromCart, isLoading, cartItems, quantityTotal, sortBy, sortProducts, setSortBy, getTotalCartAmount, searchTerm } = useContext(ShopContext);

  if (isLoading) {
    return "Loading...";
  }

  const totalPrice = getTotalCartAmount();
  const sortedProducts = sortProducts(sortBy).filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <NavLink to="/home" className="text-body">
                        <i className="me-2"><FaLongArrowAltLeft /></i>Continue shopping
                      </NavLink>
                    </h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Your Shopping cart</p>
                        <p className="mb-0"><FaShoppingCart />  {quantityTotal}</p>
                        <h4 className='mt-3'>Title</h4>
                      </div>
                      <div>
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">Sort By</button>
                        <ul className="dropdown-menu">
                          <li><NavLink className="btn btn-outline-light" onClick={() => setSortBy('price')}>
                            Price <FaAngleDown className="fas fa-angle-down mt-1" />
                          </NavLink></li>
                          <li><NavLink className="btn btn-outline-light" onClick={() => setSortBy('title')}>
                            Title <FaAngleDown className="fas fa-angle-down mt-1" />
                          </NavLink></li>
                          <li> <NavLink className="btn btn-outline-light" onClick={() => setSortBy('quantity')}>
                            Quantity <FaAngleDown className="fas fa-angle-down mt-1" />
                          </NavLink></li>
                        </ul>
                        <p className='h5 pt-3 mt-3 ps-2'><span className='me-2'>Quantity</span><span className='ps-4'>Price</span></p>
                      </div>
                    </div>

                    {sortedProducts && sortedProducts.map((product) => {
                      const cartItem = cartItems.find((item) => item.id === product.id);
                      if (cartItem && cartItem.quantity !== 0) {
                        return (
                          <CartItems key={product.id} product={product} cartItems={cartItems} quantityTotal={quantityTotal} addToCart={addToCart} removeFromCart={removeFromCart} />
                        );
                      }
                      return null;
                    })}
                  </div>

                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
                          <p className='ps-5 ms-3'>Allahverdi Khalafov</p>
                          <img
                            src="https://e7.pngegg.com/pngimages/527/757/png-clipart-hacker-hacker.png"
                            className="img-fluid rounded-circle"
                            style={{ width: '45px' }}
                            alt="Avatar"
                          />
                        </div>

                        <p className="small mb-2">Card type</p>
                        <NavLink className="text-white">
                          <FaCcMastercard className=" me-2"></FaCcMastercard>
                        </NavLink>
                        <NavLink className="text-white">
                          <FaCcVisa className=" me-2"></FaCcVisa>
                        </NavLink>
                        <NavLink className="text-white">
                          <FaCcAmex className=" me-2"></FaCcAmex>
                        </NavLink>
                        <NavLink className="text-white">
                          <FaCcPaypal />
                        </NavLink>

                        <form className="mt-4">
                          {/* Form alanları */}
                        </form>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Your Wallet</p>
                          <p className="mb-2">$13536</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping price to Azerbaijan</p>
                          <p className="mb-2">$150</p>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total (Incl. taxes)</p>
                          <p className="mb-2">$200</p>
                        </div>

                        <button type="button" className="btn btn-info btn-block btn-lg">
                          <div className="d-flex justify-content-between">
                            <span>${totalPrice}</span>
                            <span className='ms-2'>
                              Checkout <FaLongArrowAltRight className="me-2"></FaLongArrowAltRight>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ShopContext } from '../data and function components/shop-context/ShopContext';
import { NavLink } from 'react-router-dom';
import { FaLongArrowAltLeft, FaShoppingCart, FaAngleDown, FaPlus, FaMinus } from 'react-icons/fa';

const Wishlist = () => {
  const {
    addToCart,
    removeFromCart,
    isLoading,
    cartItems,
    quantityTotal,
    sortBy,
    sortProducts,
    setSortBy,
    getTotalCartAmount,
    searchTerm,
    wishlist,
    removeFromWishlist
  } = useContext(ShopContext);

  if (isLoading) {
    return "Loading...";
  }

 const wishedProducts = sortProducts(sortBy).filter((product) => {
  const wishedItem = wishlist.find((item) => item.id === product.id);
  return wishedItem && wishedItem.isWished && product.title.toLowerCase().includes(searchTerm.toLowerCase());
});

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
                        <i className="me-2"><FaLongArrowAltLeft /></i> Products
                      </NavLink>
                    </h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">Sort By</button>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink className="btn btn-outline-light" onClick={() => setSortBy('price')}>
                              Price <FaAngleDown className=" mt-1" />
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="btn btn-outline-light" onClick={() => setSortBy('title')}>
                              Title <FaAngleDown className=" mt-1" />
                            </NavLink>
                          </li>
                        </ul>
                        <p className='h5 pt-3 mt-3 ps-'><span className='ps-4'>Your Wishlist</span></p>
                      </div>
                    </div>

                    {wishedProducts.map((product) => (
                      <div className="card mb-3" key={product.id}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <NavLink to={`/product/${product.id}`}>
                                  <img src={product.image} className="img-fluid rounded-3" alt="Shopping item" style={{ width: '65px' }} />
                                </NavLink>
                              </div>
                              <div className="ms-3">
                                <h5>{product.title}</h5>
                                <p className="small mb-0">{product.category}</p>
                              </div>
                              <div className='pe-5 pt-5 me-4'>
                                <button className="btn btn-outline-dark"><NavLink to={`/product/${product.id}`}>Buy Now</NavLink></button>
                              </div>
                              <div className='pe-5 pt-5 me-4'>
                                <button className='remove h6 btn btn-outline-dark fs-6' onClick={() => removeFromWishlist(product.id)}>Remove from Wishlist</button>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: '80px' }}>
                                <h5 className="fw-normal mb-0"><em className='badge bg-primary'>Stock :</em> {product.rating.count > 200
                    ? <em className=" text-success">{product.rating.count}</em>
                    : <em className=" text-danger">{product.rating.count}</em>}</h5>
                              </div>
                              <div style={{ width: '80px' }}>
                                <h5 className="ms-3"> ${product.price}</h5>
                              </div>
                              <NavLink to="/" style={{ color: '#cecece' }}><i className="fas fa-trash-alt"></i></NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Wishlist;
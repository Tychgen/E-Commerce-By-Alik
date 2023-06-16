import React from 'react'
import { NavLink } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import {FaPlus, FaMinus} from "react-icons/fa"
import '../styles/cartItems.css'
import { addToCart, removeFromCart, selectCartItems, increaseQuantityTotal, decreaseQuantityTotal } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'

const CartItems = ({product}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)
  
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    dispatch(increaseQuantityTotal());
  };
  
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    dispatch(decreaseQuantityTotal());
  };

  return (
                 <>               
                  <div className="card mb-3">
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
                              <button className='plus' onClick={() => handleAddToCart(product.id)}><FaPlus/></button>
                            </div>
                            <div className='pe-5 pt-5 me-4'>
                              <button className='minus' onClick={() => handleRemoveFromCart(product.id)}><FaMinus/></button>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: '50px' }}>
                            <h5 className="fw-normal mb-0">{cartItems.find((item) => item.id === product.id)?.quantity || 0}</h5>

                            </div>
                            <div style={{ width: '80px' }}>
                              <h5 className="mb-0">{product.price}</h5>
                            </div>
                            <NavLink to="/" style={{ color: '#cecece' }}><i className="fas fa-trash-alt"></i></NavLink>
                          </div>
                        </div>
                      </div>
                    </div> 
                  
    </>
  )
}

export default CartItems
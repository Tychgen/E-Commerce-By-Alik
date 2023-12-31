import { useParams, NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/loader components/Loader';
import {FaShoppingCart, FaLongArrowAltLeft} from 'react-icons/fa'
import { addToCart, selectCartItems, addToWishlist, setProductsSuccess } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import useProducts from '../components/data and hook components/data hook/useProducts';
import { useEffect } from 'react';



const fetchData = async (id) => {
  console.log(id, "id")
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const Post = () => {
  const {products} = useProducts();
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems);


  const { id } = useParams()
  const { isLoading, data } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchData(id),
    enabled: !!id,
  })

  const selectedProduct = data;
  
  useEffect(() => {
    const initializeCartItems = (selectedProduct) => {
      const cartItems = selectedProduct.map((product) => ({
        id: product.id,
        quantity: -1,
      }));
    
      dispatch(addToCart(cartItems));
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



  if (!selectedProduct) {
    return null
  }

  const otherProducts = products && selectedProduct ? products.filter(product => product.category === selectedProduct.category && product.id !== selectedProduct.id) : [];


  if(isLoading){
    return <Loading/>
  }

console.log(data)

  return (
    <div className="container mt-5 mb-5">
    <div className="card">
      <div className="row g-0">
        <div className="col-md-6 border-end">
          <div className="d-flex flex-column justify-content-center">
          <NavLink to="/home" className="text-body border fs-3">
                        <i className="me-2"><FaLongArrowAltLeft/></i>Continue shopping
           </NavLink>
           <br/>
            <div className="main_image">
              <img src={selectedProduct.image} width="350" alt={selectedProduct.title} />
            </div>
            <div className="thumbnail_images">
              <ul id="thumbnail">
                <li><img src={selectedProduct.image} alt={selectedProduct.title} width="50" /></li>
                <li>{}</li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 right-side">
            <div className="d-flex justify-content-between align-items-center">
              <h3>{selectedProduct.title}</h3>
              <span className="heart"><i className='bx bx-heart'></i></span>
            </div>
            <div className="mt-2 pr-3 content">
              <p>{selectedProduct.description}</p>
            </div>
            <h3>${selectedProduct.price}</h3>
            <div className="ratings d-flex flex-row align-items-center">
              <div className="d-flex flex-row">
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bx-star'></i>
              </div>
              {selectedProduct.rating.rate < 3
                ? <><em className='pe-1'>Rating by Customers:</em>  <span className='text-danger'> {selectedProduct.rating.rate}</span></>
                :  <><em className='pe-1'>Rating by Customers:</em>  <span className='text-primary'> {selectedProduct.rating.rate} </span></>}
            </div>
            <div className="mt-5">
              <span className="fw-bold">Stock</span>
              <div className="colors">
                <ul id="marker">
                  {selectedProduct.rating.count > 200
                    ? <li className="marker-1 text-success">{selectedProduct.rating.count}</li>
                    : <li className="marker-1 text-danger">{selectedProduct.rating.count}</li>}
                  {/* <li id="marker-2"></li>
                  <li id="marker-3"></li>
                  <li id="marker-4"></li>
                  <li id="marker-5"></li> */}
                </ul>
              </div>
            </div>
            <div className="buttons d-flex flex-row mt-5 gap-3">
              <button className="btn btn-outline-dark"><NavLink to="/cart">Buy Now</NavLink></button>
              <button className="btn btn-dark" onClick={() => dispatch(addToCart(selectedProduct.id))}>
                Add to Basket {cartItems.find((item) => item.id === selectedProduct.id)?.quantity > 0
               ? <><FaShoppingCart/> {cartItems.find((item) => item.id === selectedProduct.id)?.quantity}</>
               : null}
              </button>
               <button className="btn btn-outline-dark" onClick={() => dispatch(addToWishlist(selectedProduct.id))}>Add to Wishlist</button>
            </div>
          </div>
        </div>
        <h2 className='ps-5 ms-5'>Other Products in the Same Category</h2>
      </div>
      {otherProducts.map((product) => (
        <div className="ratings d-flex flex-row align-items-center" key={product.id}>
          <div className="d-flex  pt-2">
            <NavLink to={`/product/${product.id}`}>
            <img className='border' src={product.image} alt={product.title} width="150"/>   {product.title} <em className='badge bg-primary'>Stock :</em> {product.rating.count > 200
                    ? <em className=" text-success">{product.rating.count}</em>
                    : <em className=" text-danger">{product.rating.count}</em>}</NavLink>
             
          </div>
        </div>
      ))}
    </div>
  </div>
      )
}
export default Post




      {/* <div>
      <div className="container1 shoe">
      <div className="productImage shoeImg"><img src={data.image} alt={data.title} /></div>
      <div className="size shoeSize">
        <ul>
          {id}
        </ul>
      </div>
      <div className="price shoePrice">
        <h4>PRICE</h4>
        <span>{data.price}</span>
      </div>
      <div className="color shoeColor">
        {data.title}
      </div>
      <div className="productName shoeName">
        {data.description}
      </div>

      <br></br>
      <NavLink className="button" onClick={()=>addToCart(data.id)}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
       Add to Cart
      </NavLink>

      <NavLink className="button red-button" to="/home">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
       Back Home Page
      </NavLink>
    </div>
    </div>
  
  
  
  
     <div className="search-option">
              <i className='bx bx-search-alt-2 first-search'></i>
              <div className="inputs">
                <input type="text" name="" />
              </div>
              <i className='bx bx-share-alt share'></i>
            </div>*/}

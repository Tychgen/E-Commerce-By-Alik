import React, { createContext, useState, useEffect } from 'react';
import useProducts from '../data hook/useProducts';
import Loading from "../../loading components/Loading"

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const { isLoading, products } = useProducts(); // Api
  const [cartItems, setCartItems] = useState([]); // Cart
  const [quantityTotal, setQuantityTotal] = useState(0); // Qiymetler
  const [searchTerm, setSearchTerm] = useState(""); // Searching
  const [sortBy, setSortBy] = useState('price'); // Filter
  const [wishlist, setWishlist] = useState([]); // Wishlist

  useEffect(() => {
    if (!isLoading && products && products.length > 0) {
      setCartItems(products.map((product) => ({
        id: product.id,
        quantity: 0,
      })));
      setWishlist(products.map((product) => ({
        id: product.id,
        isWished: false,
      })));
    }
  }, [isLoading, products]);

  if (isLoading) {
    return <Loading />;
  }

  const sortProducts = (sortBy) => {
    const sortedProducts = [...products];
    if (sortBy === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'title') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'quantity') {
      sortedProducts.sort((a, b) => a.quantity - b.quantity);
    }

    return sortedProducts;
  };

  const increaseQuantityTotal = () => {
    setQuantityTotal((prevTotal) => prevTotal + 1);
  };

  const decreaseQuantityTotal = () => {
    setQuantityTotal((prevTotal) => {
      if (prevTotal > 0) {
        return prevTotal - 1;
      }
      return prevTotal;
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return updatedCartItems;
    });
    increaseQuantityTotal();
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 0),
          };
        }
        return item;
      });
      return updatedCartItems;
    });
    decreaseQuantityTotal();
  };

  const addToWishlist = (id) => {
    setWishlist((prevItems) => {
      const updatedWishlist = prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isWished: true,
          };
        }
        return item;
      });
      return updatedWishlist;
    });
  };
  
  const removeFromWishlist = (id) => {
    setWishlist((prevItems) => {
      const updatedWishlist = prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isWished: false,
          };
        }
        return item;
      });
  
      return updatedWishlist;
    });
  };
  

  const getTotalCartAmount = () => {
    let totalAmount = products.reduce((acc, product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 0) {
        return acc + cartItem.quantity * product.price;
      }
      return acc;
    }, 0);

    const roundedTotal = Math.round(totalAmount * 100000) / 100000;
    return roundedTotal;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    products,
    isLoading,
    quantityTotal,
    searchTerm,
    handleSearch,
    sortBy,
    sortProducts,
    setSortBy,
    getTotalCartAmount,
    addToWishlist,
    wishlist,
    removeFromWishlist,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;














































































// useState - object olarsa

// import React, { createContext, useState, useEffect } from 'react';
// import useProducts from '../fetchApi/useProducts';

// export const ShopContext = createContext(null);

// const ShopContextProvider = ({ children }) => {
//   const { isLoading, products, } = useProducts();  // Api
//   const [cartItems, setCartItems] = useState({}); // Cart 
//   const [quantityTotal, setQuantityTotal] = useState(0); //  Qiymetler
//   const [searchTerm, setSearchTerm] = useState(""); //Searching
//   const [sortBy, setSortBy] = useState('price'); // Filter
//   const [wishlist, setWishlist] = useState({}); //Wishlist

//   useEffect(() => {
//     if (!isLoading && products && products.length > 0) {
//       setWishlist(getDefaultCart())
//       setCartItems(getDefaultCart());
//     }
//   }, [isLoading, products]);

//   const updateQuantityTotal = () => {
//     const total = Object.values(cartItems).reduce((acc, val) => acc + val, 0) + 1;
//     setQuantityTotal(total);
//   };

//   const getDefaultCart = () => {
//     let cart = {};
//     if (products && products.length > 0) {
//       for (const product of products) {
//         cart[product.id] = cartItems[product.id] || 0;
//       }
//     }
//     const total = Object.values(cart).reduce((acc, val) => acc + val, 0);
//     setQuantityTotal(total);
//     return { ...cart, quantityTotal: total };
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
  
//     for (const product of products) {
//       if (cartItems[product.id] > 0) {
//         totalAmount += product.price * cartItems[product.id];
//       }
//     }
//   const roundedTotal = Math.round(totalAmount * 100000) / 100000;
//     return roundedTotal;
//   };
  

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const sortProducts = (sortBy) => {
//     const sortedProducts = [...products];
//     if (sortBy === 'price') {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'title') {
//       sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortBy === 'quantity') {
//       sortedProducts.sort((a, b) => a.quantity - b.quantity);
//     }
  
//     return sortedProducts;
//   };
//   const addToCart = (productId) => {
//     if (cartItems[productId] !== undefined) {
//       setCartItems((prevCartItems) => ({
//         ...prevCartItems,
//         [productId]: prevCartItems[productId] + 1,
//       }));
//       updateQuantityTotal(); 
//     }
//   };

//   const removeFromCart = (productId) => {
//     if (cartItems[productId] !== undefined && cartItems[productId] > 0) {
//       setCartItems((prevCartItems) => ({
//         ...prevCartItems,
//         [productId]: prevCartItems[productId] - 1,
//       }));
//       const total = Object.values(cartItems).reduce((acc, val) => acc + val, 0) - 1;
//       setQuantityTotal(total);
//     }
//   };
  

//   const addToWishlist = (productId) => {
//     if (wishlist[productId] !== undefined) {
//       setWishlist((prevWishlist) => ({
//         ...prevWishlist,
//         [productId]: {
//           ...prevWishlist[productId],
//           isWished: true,
//         },
//       }));
//     }
//   };

//   const removeFromWishlist = (productId) => {
//     if (wishlist[productId] !== undefined) {
//       setWishlist((prevWishlist) => ({
//         ...prevWishlist,
//         [productId]: {
//           ...prevWishlist[productId],
//           isWished: false,
//         },
//       }));
//     }
//   };

//   console.log(cartItems)
//   console.log(quantityTotal)

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     products,
//     isLoading,
//     quantityTotal,
//     searchTerm,
//     handleSearch,
//     sortBy,
//     sortProducts,
//     setSortBy,
//     getTotalCartAmount,
//     addToWishlist,
//     wishlist,
//     removeFromWishlist,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

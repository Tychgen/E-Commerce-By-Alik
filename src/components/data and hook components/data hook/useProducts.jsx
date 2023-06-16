import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setProductsSuccess } from '../../../store/store';
import { useEffect } from 'react';

const useProducts = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  const { isLoading, error, data: products } = useQuery(['products'], fetchData, {
    onSuccess: (data) => {
      const modifiedData = data.map((product) => ({
        ...product,
        quantity: 0,
        isWished: false
      }));
      dispatch(setProductsSuccess(modifiedData));
    },
  });

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      dispatch(setProductsSuccess(products));
    }
  }, [dispatch, isLoading, products]);

  return {
    isLoading,
    products,
    error,
  };
};

export default useProducts;
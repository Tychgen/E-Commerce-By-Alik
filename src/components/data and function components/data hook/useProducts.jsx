import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    const modifiedData = data.map((product) => ({ ...product, quantity: 0, isWished: false }));
    return modifiedData;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};


const useProducts = () => {


  const { isLoading, error, data } = useQuery(['products'], fetchData);
  return {
    isLoading,
    products: data,
              error
  }
};

export default useProducts;
import { useState } from 'react'
import useFetchGet from '../../../hooks/useFetchGet';
import ProductsTable from '../../../components/partials/products/ProductsTable'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useEffect } from 'react';
import ErrorAlert from '../../../components/ErrorAlert';
import { Box, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const products_url = `${import.meta.env.VITE_SERVER_URL}/products/managers/all`;
  const [data, loading, error] = useFetchGet(products_url);
  const toast = useToast();

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/products/managers/delete-product/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        title: 'Delete Product',
        description: "The product has been deleted successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);

    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <Box h='100vh'><ErrorAlert error={error} /></Box>}
      {products &&
        <ProductsTable
          products={products}
          handleProductAdded={handleProductAdded}
          deleteProduct={deleteProduct}
        />}
    </>
  )
}

export default Products
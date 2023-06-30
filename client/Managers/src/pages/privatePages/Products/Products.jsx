import { useState } from 'react'
import useFetchGet from '../../../hooks/useFetchGet';
import ProductsTable from '../../../components/partials/Products/ProductsTable'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useEffect } from 'react';
import ErrorAlert from '../../../components/ErrorAlert';
import { Box } from '@chakra-ui/react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const products_url = `${import.meta.env.VITE_SERVER_URL}/products/managers/all`;
  const [data, loading, error] = useFetchGet(products_url);
  console.log(data);

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
      {products && <ProductsTable products={products} handleProductAdded={handleProductAdded} />}
    </>
  )
}

export default Products
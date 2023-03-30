import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../apiAdapters/products'

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate

  async function getAllProductsPage() {
    try {
      const result = await getAllProducts();
      console.log(result, 'result here')
      setProducts(result.products);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProductsPage();
  }, [])

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product, idx) => {
          return(<div>
            <h2>{product.name}</h2>
          </div>)
        })}
      </div>
    </div>
  )
}

export default Products
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../../apiAdapters';

function EditProduct({ token, user, selectedProduct, setSelectedProduct }) {
  const [name, setName] = useState(selectedProduct.name);
  const [description, setDescription] = useState(selectedProduct.description);
  const [price, setPrice] = useState(selectedProduct.price.replace('$', ''));
  const [pic_url, setPic_url] = useState(selectedProduct.pic_url);
  const [inventory, setInventory] = useState(selectedProduct.inventory);
  const product_id = Number(selectedProduct.product_id);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function updateSelectedProduct(
    name,
    description,
    price,
    pic_url,
    inventory
  ) {
    try {
      if (user.is_admin) {
        if (price < 0.01 || inventory < 1) {
          if (price < 0.01) {
            setError('The price must be higher than $0.');
          }
          if (inventory < 1) {
            setError('The inventory must be higher than 0.');
          }
        } else {
          const result = await updateProduct(
            token,
            product_id,
            name,
            description,
            price,
            pic_url,
            inventory
          );
          console.log(result, 'result from editing product');
          if (result.success) {
            setSelectedProduct({});
            navigate('/products');
          }
        }
      } else {
        setError('You have to be an admin to edit a product.');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='new-product-form'>
      <h1 className='pageTitle'>Edit Product</h1>
      <form
        className='defaultForm'
        onSubmit={(e) => {
          e.preventDefault();
          updateSelectedProduct(name, description, price, pic_url, inventory);
        }}
      >
        <label className='formLabel'>
          Name:
          <input
            id='textBox'
            type='text'
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Description:
          <input
            id='textBox'
            type='text'
            name='description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Price: $
          <input
            id='textBox'
            type='number'
            name='price'
            value={price}
            min='0.00'
            step='0.01'
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Picture:
          <input
            id='textBox'
            type='url'
            name='pic_url'
            value={pic_url}
            onChange={(e) => {
              setPic_url(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Inventory:
          <input
            id='textBox'
            type='number'
            name='inventory'
            value={inventory}
            min='0'
            onChange={(e) => {
              setInventory(e.target.value);
            }}
          />
        </label>
        <button type='submit' className='Button'>
          Submit
        </button>
        {error === '' ? null : <p className='error'>{error}</p>}
      </form>
    </div>
  );
}

export default EditProduct;

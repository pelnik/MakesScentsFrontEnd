import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createProduct } from '../../apiAdapters';

function NewProduct({ token, user, categoryList }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [pic_url, setPic_url] = useState('');
  const [size, setSize] = useState('');
  const [inventory, setInventory] = useState(0);
  const [category_id, setCategory_id] = useState(1);
  const [color, setColor] = useState('');
  const [fragrance, setFragrance] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(categoryList);

  const navigate = useNavigate();

  async function postNewProduct() {
    try {
      if (user.is_admin) {
        const result = await createProduct(
          token,
          name,
          description,
          price,
          pic_url,
          size,
          inventory,
          category_id,
          color,
          fragrance
        );
        console.log(result, 'result');
        if (result.success === true) {
          setName('');
          setDescription('');
          setPrice('');
          setPic_url('');
          setSize('');
          setInventory(0);
          setCategory_id(1);
          setColor('');
          setFragrance('');
          navigate('/products');
        } else {
          setError(result.message);
          console.log('creating new product failed error');
        }
      } else {
        setError('You have to be an admin to add a new product.');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='new-product-form'>
      <h1 className='pageTitle'>Add New Product</h1>
      <form
        className='defaultForm'
        onSubmit={(e) => {
          e.preventDefault();
          postNewProduct();
        }}
      >
        <label className='formLabel'>
          Name:
          <input
            id='textBox'
            type='text'
            name='name'
            value={name}
            required
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
            required
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
            required
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
            required
            onChange={(e) => {
              setPic_url(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Size:
          <input
            id='textBox'
            type='text'
            name='size'
            value={size}
            required
            onChange={(e) => {
              setSize(e.target.value);
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
            required
            min='0'
            onChange={(e) => {
              setInventory(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Category:
          <select
            value={category_id}
            onChange={(e) => {
              setCategory_id(Number(e.target.value));
            }}
          >
            {categories.map((category, idx) => {
              return (
                <option key={`new-product-category${idx}`}
                value={category.category_id}>
                  {category.category_name}
                </option>
              );
            })}
          </select>
        </label>

        <label className='formLabel'>
          Color:
          <input
            id='textBox'
            type='text'
            name='color'
            value={color}
            required
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </label>

        <label className='formLabel'>
          Fragrance:
          <input
            id='textBox'
            type='text'
            name='fragrance'
            value={fragrance}
            required
            onChange={(e) => {
              setFragrance(e.target.value);
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

export default NewProduct;

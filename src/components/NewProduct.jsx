import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createProduct } from '../apiAdapters';

function NewProduct({ token }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [pic_url, setPic_url] = useState('');
  const [size, setSize] = useState('');
  const [inventory, setInventory] = useState(0);
  const [category_id, setCategory_id] = useState(0);
  const [color, setColor] = useState('');
  const [fragrance, setFragrance] = useState('');

  async function postNewProduct() {
    try {
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
      console.log(result, 'result of creating product');
      if (result.success === true) {
        setName('');
        setDescription('');
        setPrice('');
        setPic_url('');
        setSize('');
        setInventory(0);
        setCategory_id(0);
        setColor('');
        setFragrance('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postNewProduct();
        }}
      >
        <h1>Add New Product</h1>
        <div className='input-group'>
          <label>
            Name:
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Description:
            <input
              type='text'
              name='description'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Price: $
            <input
              type='text'
              name='price'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Picture:
            <input
              type='url'
              name='pic_url'
              value={pic_url}
              onChange={(e) => {
                setPic_url(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Size:
            <input
              type='text'
              name='size'
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Inventory:
            <input
              type='number'
              name='inventory'
              value={inventory}
              min='0'
              onChange={(e) => {
                setInventory(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Category:
            <input
              type='number'
              name='category_id'
              value={category_id}
              onChange={(e) => {
                setCategory_id(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Color:
            <input
              type='text'
              name='color'
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </label>
        </div>
        <div className='input-group'>
          <label>
            Fragrance:
            <input
              type='text'
              name='fragrance'
              value={fragrance}
              onChange={(e) => {
                setFragrance(e.target.value);
              }}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;

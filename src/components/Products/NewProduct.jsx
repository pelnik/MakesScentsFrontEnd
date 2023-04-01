import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createProduct } from '../../apiAdapters';

function NewProduct({ token, user }) {
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

  const navigate = useNavigate();

  async function postNewProduct() {
    try {
      if (user.is_admin === true) {
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
          console.log('creating new product failed error'); // need to add error message
        }
      } else {
        setError('You have to be an admin to add new products.');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="new-product-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postNewProduct();
        }}
      >
        <h1>Add New Product</h1>
        <div className="input-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Price: $
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Picture:
            <input
              type="url"
              name="pic_url"
              value={pic_url}
              onChange={(e) => {
                setPic_url(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Size:
            <input
              type="text"
              name="size"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Inventory:
            <input
              type="number"
              name="inventory"
              value={inventory}
              min="0"
              onChange={(e) => {
                setInventory(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Category:
            <select
              value={category_id}
              onChange={(e) => {
                setCategory_id(Number(e.target.value));
              }}
            >
              <option value="1">Candle</option>
              <option value="2">Diffuser</option>
              <option value="3">Car</option>
            </select>
          </label>
        </div>
        <div className="input-group">
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Fragrance:
            <input
              type="text"
              name="fragrance"
              value={fragrance}
              onChange={(e) => {
                setFragrance(e.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewProduct;

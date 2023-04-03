import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../../apiAdapters';

function EditProduct({ token, user, selectedProduct, setSelectedProduct }) {
  const [name, setName] = useState(selectedProduct.name);
  const [description, setDescription] = useState(selectedProduct.description);
  const [price, setPrice] = useState(selectedProduct.price);
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
        const result = await updateProduct(
          token,
          product_id,
          name,
          description,
          price,
          pic_url,
          inventory
        );
        console.log('name change', name);
        console.log(result, 'result from editing product');
        if (result.success) {
          setSelectedProduct({});
          navigate('/products');
        }
      } else {
        setError('You have to be an admin to edit a product.');
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
          updateSelectedProduct(name, description, price, pic_url, inventory);
        }}
      >
        <h1>Edit Product</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProduct;

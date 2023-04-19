import React, { useState } from 'react';
import { createCategory } from '../../apiAdapters';

function CategoryFilter({ token, user }) {
  const [showForm, setShowForm] = useState(false);
  const [category_name, setCategory_name] = useState('');

  async function postNewCategory() {
    try {
      if (user.is_admin) {
        const result = await createCategory(token, category_name);
        if (result.success) {
          setCategory_name('');
          setShowForm(!showForm);
        } else {
          setError(result.message);
          console.log('creating new category failed error');
        }
      } else {
        setError('You have to be an admin to add a new category.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {user.is_admin ? (
        <button
          className="product-button category-button"
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Add New Category
        </button>
      ) : null}
      {showForm ? (
        <div id="add-category-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postNewCategory();
            }}
          >
            <label className="add-category-name">
              Name:
              <input
                id="add-category-input"
                type="text"
                name="category_name"
                value={category_name}
                onChange={(e) => {
                  setCategory_name(e.target.value);
                }}
              />
            </label>
            <div id="add-category-button">
              <button className="product-button category-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default CategoryFilter;

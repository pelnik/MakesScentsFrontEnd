import React, { useEffect, useState } from 'react';
import { getAllCategories, createCategory } from '../../apiAdapters';

function AddNewCategory({ user }) {
  const [categories, setCategories] = useState([]);

  async function getAllCategoryFilter() {
    try {
      const result = await getAllCategories();
      if (result.success) {
        console.log('getting all categories', result);
        setCategories(result.categories);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postNewCategory() {
    try {
      const result = await createCategory(token, category_name);
      if (result.success) {
        console.log('creating new category', result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategoryFilter();
  }, []);

  return (
    <div id='products-filter'>
      <h2>Filter</h2>
      {user.is_admin ? <button>Add New Category</button> : null}
      <ul className='category-list'></ul>
      {categories.map((category, idx) => {
        return (
          <li key={`category${idx}`}>
            <input
              type='checkbox'
              id='category'
              name={category.category_name}
              value={category.category_name}
            />
            <label htmlFor='category'>{category.category_name}</label>
          </li>
        );
      })}
    </div>
  );
}

export default AddNewCategory;

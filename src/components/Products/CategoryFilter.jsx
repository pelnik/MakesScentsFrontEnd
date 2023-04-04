import React, { useEffect, useState } from 'react';
import { getAllCategories, createCategory } from '../../apiAdapters';

function CategoryFilter({ token, user }) {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [category_name, setCategory_name] = useState('');

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
      if (user.is_admin) {
        const result = await createCategory(token, category_name);
        console.log('creating new category', result);
        if (result.success) {
          setCategory_name('');
          setShowForm(!showForm)
        } else {
          setError(result.message);
          console.log('creating new category failed error');
        }
      } else {
        setError('You have to be an admin to add a new category.')
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
      {user.is_admin ? (
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Add New Category
        </button>
      ) : null}
      {showForm ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postNewCategory();
            }}
          >
            <label>
              Name:
              <input
                type='text'
                name='category_name'
                value={category_name}
                onChange={(e) => {
                  setCategory_name(e.target.value);
                }}
              />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      ) : null}
      <ul className='category-list'>
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
      </ul>
    </div>
  );
}

export default CategoryFilter;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import {
  getAllProducts,
  deleteProduct,
  addCartItem,
  getAllCategories,
  updateCartQuantity,
} from '../../apiAdapters';
import { CategoryFilter } from '..';

import { Oval } from 'react-loader-spinner';

function Products({
  token,
  user,
  setSelectedProduct,
  cart,
  setCart,
  getCart,
  setCategoryList,
}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [showCart, setShowCart] = useState(initializeShowCart(products));
  const [searchTerm, setSearchTerm] = useState('');
  const [lowerSearchTerm, setLowerSearchTerm] = useState('');
  const navigate = useNavigate();

  async function getAllProductsPage() {
    try {
      const result = await getAllProducts();
      if (result.success) {
        console.log('getting all products', result);
        const showCartResult = initializeShowCart(result.products);

        setProducts(result.products);
        setShowCart(showCartResult);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProduct(product_id) {
    try {
      const result = await deleteProduct(token, product_id);
      if (result.success) {
        const productsCopy = [...products].filter((n, idx) => {
          return n.id !== product_id;
        });

        setShowCart(removeShowCart(product_id));
        setProducts(productsCopy);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShoppingCartClick(evt, product_id) {
    setShowCart({
      ...showCart,
      [product_id]: {
        ...showCart[product_id],
        show: !showCart[product_id].show,
      },
    });
  }

  function initializeShowCart(products) {
    const newShowCart = {};

    products.forEach((product) => {
      newShowCart[product.id] = {
        show: false,
        amountToAdd: 1,
        error: '',
        loading: false,
      };
    });

    return newShowCart;
  }

  function removeShowCart(productId) {
    const showCartCopy = { ...showCart };

    delete showCartCopy.productId;

    return showCartCopy;
  }

  function handleCartInputChange(evt, productId) {
    const numEvtValue = Number(evt.target.value);
    if (numEvtValue > 0) {
      setShowCart({
        ...showCart,
        [productId]: {
          ...showCart[productId],
          amountToAdd: numEvtValue,
          error: '',
        },
      });
    } else {
      setShowCart({
        ...showCart,
        [productId]: {
          ...showCart[productId],
          error: 'Value must be greater than 1',
        },
      });
    }
  }

  async function handleCartInputSubmit(evt, productId) {
    try {
      if (
        showCart[productId].amountToAdd < 1 ||
        typeof showCart[productId].amountToAdd !== 'number'
      ) {
        setShowCart({
          ...showCart,
          [productId]: {
            ...showCart[productId],
            error: 'Quantity cannot be less than 1',
          },
        });
      } else {
        const cartItem = cart.items.find((item) => {
          return item.product_id === productId;
        });

        if (!cartItem) {
          setShowCart({
            ...showCart,
            [productId]: {
              ...showCart[productId],
              loading: true,
            },
          });

          const result = await addCartItem(
            token,
            productId,
            showCart[productId].amountToAdd
          );

          if (result.success) {
            const cartResult = await getCart(token);
            setShowCart({
              ...showCart,
              [productId]: {
                ...showCart[productId],
                amountToAdd: 1,
                show: false,
                error: '',
                loading: false,
              },
            });
            setCart(cartResult);
          } else {
            setShowCart({
              ...showCart,
              [productId]: {
                ...showCart[productId],
                error: 'Error updating cart',
                loading: false,
              },
            });
          }
        } else {
          setShowCart({
            ...showCart,
            [productId]: {
              ...showCart[productId],
              loading: true,
            },
          });

          const result = await updateCartQuantity(
            token,
            cartItem.id,
            cartItem.quantity + showCart[productId].amountToAdd
          );

          if (result.success) {
            const cartResult = await getCart(token);
            setShowCart({
              ...showCart,
              [productId]: {
                ...showCart[productId],
                amountToAdd: 1,
                show: false,
                error: '',
                loading: false,
              },
            });
            setCart(cartResult);
          } else {
            setShowCart({
              ...showCart,
              [productId]: {
                ...showCart[productId],
                error: 'Error updating cart',
                loading: false,
              },
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllCategoryFilter() {
    try {
      const result = await getAllCategories();
      if (result.success) {
        setCategories(result.categories);
        setCategoryList(result.categories);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filterHandler = (evt) => {
    if (evt.target.checked) {
      setSelectedFilter([...selectedFilter, evt.target.id]);
    } else {
      setSelectedFilter(
        selectedFilter.filter((filterId) => filterId !== evt.target.id)
      );
    }
  };

  const filteredProducts = products.filter((product) => {
    return selectedFilter.length > 0
      ? selectedFilter.some((filter) => {
          return product.category_id === Number(filter);
        })
      : products;
  });

  function productMatches(product, text) {
    if (
      product.name.toLowerCase().includes(text) ||
      product.size.toLowerCase().includes(text) ||
      product.description.toLowerCase().includes(text) ||
      product.fragrance.toLowerCase().includes(text) ||
      product.color.toLowerCase().includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  }

  const searchedProducts = products.filter((product) =>
    productMatches(product, lowerSearchTerm)
  );
  const searchedDisplay = searchTerm.length ? searchedProducts : products;

  const searchHandle = (e) => {
    setSearchTerm(e.target.value);
    setLowerSearchTerm(e.target.value.toLowerCase());
  };

  const bothFilter = searchedProducts.filter((product) => {
    return selectedFilter.length > 0
      ? selectedFilter.some((filter) => {
          return product.category_id === Number(filter);
        })
      : products;
  });

  const productsList =
    searchTerm.length && selectedFilter.length
      ? bothFilter
      : !searchTerm.length && selectedFilter.length
      ? filteredProducts
      : searchTerm.length && !selectedFilter.length
      ? searchedDisplay
      : products;

  const oneSize = (size) => {
    if (size === 'N') {
      return 'One Size';
    } else {
      return size;
    }
  };

  useEffect(() => {
    getAllProductsPage();
  }, []);

  useEffect(() => {
    getAllCategoryFilter();
  }, []);

  return (
    <div id='products-page-container'>
      <div id='products-header'>
        <div id='products-header-left'>
          <h1>Products</h1>
          <input
            id='products-search'
            type='text'
            placeholder='Search for Product'
            value={searchTerm}
            onChange={searchHandle}
          />
        </div>
        {user.is_admin ? (
          <button
            className='add-button product-button'
            onClick={() => {
              navigate('/products/new');
            }}
          >
            Add New Product
          </button>
        ) : null}
      </div>
      <div id='side-by-side'>
        <div id='products-filter'>
          <h2>Filters</h2>
          <CategoryFilter token={token} user={user} />
          <br />
          <ul className='category-list'>
            {categories.map((category, idx) => {
              return (
                <li key={`category${idx}`}>
                  <input
                    type='checkbox'
                    id={category.id}
                    name={category.category_name}
                    value={category.category_name}
                    onChange={filterHandler}
                  />
                  <label htmlFor='category'>{category.category_name}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div id='products-list'>
          {productsList.length ? (
            productsList.map((product, idx) => {
              return (
                <div id='products-container' key={`products${idx}`}>
                  <div
                    className='product-detail'
                    onClick={() => {
                      setSelectedProduct({ product_id: product.id });
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    <div className='product-image-box'>
                      {product.inventory === 0 ? (
                        <span id='sold-out-icon'>SOLD OUT</span>
                      ) : null}
                      <img
                        src={product.pic_url}
                        id='product-pic'
                        alt='pic of candle product'
                      />
                    </div>
                    <div className='product-text-detail'>
                      <h4>{product.name}</h4>
                      <h5>Size: {oneSize(product.size)}</h5>
                      <h3 className='important-product-detail'>
                        {product.price}
                      </h3>
                    </div>
                  </div>
                  {product.inventory !== 0 && token ? (
                    <div className='add-cart-container loader-container'>
                      <div className='add-shopping-cart-icon-container'>
                        <AddShoppingCartIcon
                          className={
                            showCart[product.id].loading
                              ? 'add-shopping-cart-icon fade-loader'
                              : 'add-shopping-cart-icon'
                          }
                          onClick={(evt) => {
                            showCart[product.id].loading
                              ? null
                              : handleShoppingCartClick(evt, product.id);
                          }}
                        />
                        {showCart[product.id].show ? (
                          <p
                            className={
                              showCart[product.id].loading
                                ? 'fade-loader'
                                : null
                            }
                          >
                            How many to add?
                          </p>
                        ) : null}
                      </div>
                      {showCart[product.id].show ? (
                        <div
                          className={
                            showCart[product.id].loading
                              ? 'fade-loader show-cart-input'
                              : 'show-cart-input'
                          }
                        >
                          <input
                            className={
                              showCart[product.id].loading
                                ? 'fade-loader'
                                : null
                            }
                            onChange={(evt) => {
                              showCart[product.id].loading
                                ? null
                                : handleCartInputChange(evt, product.id);
                            }}
                            type='number'
                            max={product.inventory}
                            value={showCart[product.id].amountToAdd}
                          />
                          <button
                            type='submit'
                            className={
                              showCart[product.id].loading
                                ? 'fade-loader cart-button'
                                : 'cart-button'
                            }
                            onClick={(evt) => {
                              showCart[product.id].loading
                                ? null
                                : handleCartInputSubmit(evt, product.id);
                            }}
                          >
                            Add
                          </button>
                        </div>
                      ) : null}
                      {showCart[product.id].error ? (
                        <p className='cart-warning'>
                          {showCart[product.id].error}
                        </p>
                      ) : null}
                      {showCart[product.id].loading ? (
                        <div className='spinner-container'>
                          <Oval
                            className='loading-spinner'
                            height={'2em'}
                            width={'2em'}
                            color='#db7c5a'
                            wrapperStyle={{}}
                            wrapperClass=''
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor='#db7c5a'
                            strokeWidth={20}
                            strokeWidthSecondary={20}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {user.is_admin ? (
                    <div className='admin-product-card'>
                      <div id='product-inventory'>
                        <p>Inventory: {product.inventory}</p>
                      </div>
                      <div className='product-buttons-container'>
                        <button
                          className='product-button'
                          onClick={() => {
                            setSelectedProduct({
                              product_id: product.id,
                              name: product.name,
                              description: product.description,
                              price: product.price,
                              pic_url: product.pic_url,
                              inventory: product.inventory,
                            });
                            navigate(`/products/edit/${product.id}`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className='product-button'
                          onClick={() => {
                            removeProduct(product.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p>No matching product</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;

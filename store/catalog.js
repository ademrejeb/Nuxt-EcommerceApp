import axios from 'axios';

const API_URL = 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/products';

export const state = () => ({
  products: [],
  productDetails: null, // Store details for a single product
  isBusy: false,
  error: null,
});

export const getters = {
  ALL_PRODUCTS: (state) => state.products,
  IS_BUSY: (state) => state.isBusy,
  ERROR: (state) => state.error,
  PRODUCTS_COUNT: (state) => state.products.length,
  PRODUCT_DETAILS: (state) => state.productDetails, // Getter for single product details
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = Array.isArray(products) ? products : [];
    state.isBusy = false;
  },
  SET_PRODUCT_DETAILS(state, product) {
    state.productDetails = product;
  },
  SET_IS_BUSY(state, isBusy) {
    state.isBusy = isBusy;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.isBusy = false;
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product);
  },
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex((product) => product.external_id === updatedProduct.external_id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    } else {
      console.warn('Product ID not found for update:', updatedProduct.external_id);
    }
  },
  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter((product) => product.external_id !== productId);
  },
};

export const actions = {
  async FETCH_PRODUCTS({ commit }) {
    commit('SET_IS_BUSY', true);
    commit('SET_ERROR', null);
    try {
      const response = await axios.get(API_URL);
      const products = response.data.products || [];
      commit('SET_PRODUCTS', Array.isArray(products) ? products : []);
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error fetching products.');
      console.error('Error fetching products:', error);
    } finally {
      commit('SET_IS_BUSY', false);
    }
  },
  async FETCH_PRODUCT_DETAILS({ commit }, id) {
    commit('SET_IS_BUSY', true);
    commit('SET_ERROR', null);
    try {
      console.log('Fetching product details for ID:', id); // Debug log
      const response = await axios.get(`${API_URL}/${id}`);
      const product = response.data; // Assume response contains the product object directly
      if (product) {
        console.log('Product details fetched successfully:', product); // Debug log
        commit('SET_PRODUCT_DETAILS', product);
        return product; // Return the product for local use
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error fetching product details.');
      console.error('Error fetching product details:', error);
      throw error; // Re-throw error for handling in the component
    } finally {
      commit('SET_IS_BUSY', false);
    }
  },
  async ADD_PRODUCT({ commit }, productData) {
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.post(API_URL, productData);
      const addedProduct = response.data.product;
      if (addedProduct) {
        commit('ADD_PRODUCT', addedProduct);
      } else {
        throw new Error('Failed to add product.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error adding product.');
      console.error('Error adding product:', error);
    } finally {
      commit('SET_IS_BUSY', false);
    }
  },
  async UPDATE_PRODUCT({ commit }, { productId, productData }) {
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.put(`${API_URL}/${productId}`, productData);
      const updatedProduct = response.data.product;
      if (updatedProduct) {
        commit('UPDATE_PRODUCT', updatedProduct);
      } else {
        throw new Error('Update failed: No product returned.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error updating product.');
      console.error('Error updating product:', error);
    } finally {
      commit('SET_IS_BUSY', false);
    }
  },
  async DELETE_PRODUCT({ commit }, productId) {
    commit('SET_IS_BUSY', true);
    try {
      await axios.delete(`${API_URL}/${productId}`);
      commit('DELETE_PRODUCT', productId);
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error deleting product.');
      console.error('Error deleting product:', error);
    } finally {
      commit('SET_IS_BUSY', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

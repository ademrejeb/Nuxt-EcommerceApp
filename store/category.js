import axios from 'axios';

const API_URL = 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/categories';

export const state = () => ({
  categories: [],
  isBusy: true,
  error: null,
  categoriesCount: 0,
});

export const getters = {
  ALL_CATEGORIES: (state) => state.categories,
  IS_BUSY: (state) => state.isBusy,
  ERROR: (state) => state.error,
  CATEGORIES_COUNT: (state) => state.categoriesCount,
};

export const mutations = {
  SET_CATEGORIES: (state, categories) => {
    state.categories = Array.isArray(categories) ? categories : [];
    state.categoriesCount = state.categories.length;
    state.isBusy = false;
  },
  SET_IS_BUSY: (state, isBusy) => {
    state.isBusy = isBusy;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
    state.isBusy = false;
  },
  ADD_CATEGORY: (state, category) => {
    state.categories.push(category);
    state.categoriesCount++;
  },
  UPDATE_CATEGORY: (state, updatedCategory) => {
    const index = state.categories.findIndex(
      (category) => category.external_id === updatedCategory.external_id
    );
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },
  DELETE_CATEGORY: (state, categoryId) => {
    state.categories = state.categories.filter(
      (category) => category.external_id !== categoryId
    );
    state.categoriesCount--;
  },
};

export const actions = {
  async FETCH_CATEGORIES({ commit }) {
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.get(API_URL);
      const categories = response.data.categories;
      if (Array.isArray(categories)) {
        commit('SET_CATEGORIES', categories);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      commit(
        'SET_ERROR',
        error.message || 'An error occurred while fetching categories.'
      );
      console.error('Error fetching categories:', error);
    }
  },

  async ADD_CATEGORY({ commit }, categoryData) {
    try {
      const response = await axios.post(API_URL, categoryData);
      if (response.data && response.data.category) {
        commit('ADD_CATEGORY', response.data.category);
      } else {
        throw new Error('Failed to add category.');
      }
    } catch (error) {
      commit(
        'SET_ERROR',
        error.message || 'An error occurred while adding the category.'
      );
      console.error('Error details:', error);
    }
  },

  async UPDATE_CATEGORY({ commit }, { categoryId, categoryData }) {
    try {
      const response = await axios.put(`${API_URL}/${categoryId}`, categoryData);
      if (response.data && response.data.category) {
        commit('UPDATE_CATEGORY', response.data.category);
      } else {
        throw new Error('Update failed: No category returned.');
      }
    } catch (error) {
      commit(
        'SET_ERROR',
        error.message || 'An error occurred while updating the category.'
      );
      console.error('Error updating category:', error);
    }
  },

  async DELETE_CATEGORY({ commit }, categoryId) {
    try {
      await axios.delete(`${API_URL}/${categoryId}`);
      commit('DELETE_CATEGORY', categoryId);
    } catch (error) {
      commit(
        'SET_ERROR',
        error.message || 'An error occurred while deleting the category.'
      );
      console.error('Error details:', error);
    }
  },
};

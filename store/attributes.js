import axios from 'axios';

const API_URL = 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/attributes'; // Update this URL as needed

export const state = () => ({
  attributes: [],
  isBusy: false,
  error: null,
});

export const getters = {
  ALL_ATTRIBUTES: (state) => state.attributes,
  IS_BUSY: (state) => state.isBusy,
  ERROR: (state) => state.error,
  ATTRIBUTES_COUNT: (state) => state.attributes.length,
};

export const mutations = {
  SET_ATTRIBUTES(state, attributes) {
    state.attributes = Array.isArray(attributes) ? attributes : [];
    state.isBusy = false;
  },
  SET_IS_BUSY(state, isBusy) {
    state.isBusy = isBusy;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.isBusy = false;
  },
  addAttribute(state, attribute) {
    state.attributes.push(attribute);
  },
  
  UPDATE_ATTRIBUTE(state, updatedAttribute) {
    const index = state.attributes.findIndex((attribute) => attribute._id === updatedAttribute._id);
    if (index !== -1) {
      state.attributes.splice(index, 1, updatedAttribute);
    } else {
      console.warn('Attribute ID not found for update:', updatedAttribute._id);
    }
  },
  
  deleteAttributeAction(state, attributeId) {
    state.attributes = state.attributes.filter((attribute) => attribute._id !== attributeId);
  },
};

export const actions = {
  async fetchAttributes({ commit }) {
    commit('SET_IS_BUSY', true);
    commit('SET_ERROR', null);
    try {
      const response = await axios.get(API_URL);
      const attributes = response.data.attributes; // Adjust according to your API response structure
      commit('SET_ATTRIBUTES', Array.isArray(attributes) ? attributes : []);
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error fetching attributes.');
      console.error('Error fetching attributes:', error);
    }
  },
  async addAttribute({ commit }, attributeData) {
    try {
      const response = await axios.post(API_URL, attributeData);
      const addedAttribute = response.data.attribute; // Adjust according to your API response structure
      if (addedAttribute) {
        commit('addAttribute', addedAttribute);
      } else {
        throw new Error('Failed to add attribute.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error adding attribute.');
      console.error('Error adding attribute:', error.response ? error.response.data : error);
    }
  },


  async updateAttribute({ commit }, { attributeId, attributeData }) {
    try {
      const requestData = {
        attribute: attributeData,
        update_masks: [
          'label', 'category', 'kind', 'groups', 'native', 'values', 'icon'
        ],
      };
      const response = await axios.put(`${API_URL}/${attributeId}`, requestData);
      const updatedAttribute = response.data.attribute; // Adjust to match API response
      if (updatedAttribute) {
        commit('UPDATE_ATTRIBUTE', updatedAttribute);
      } else {
        throw new Error('Update failed: No attribute returned.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error updating attribute.');
      console.error('Error updating attribute:', error.response ? error.response.data : error);
    }
  },
  async deleteAttributeAction({ commit }, attributeId) {
    try {
      await axios.delete(`${API_URL}/${attributeId}`);
      commit('deleteAttributeAction', attributeId);
    } catch (error) {
      commit('SET_ERROR', error.message || 'Error deleting attribute.');
      console.error('Error deleting attribute:', error.response ? error.response.data : error);
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

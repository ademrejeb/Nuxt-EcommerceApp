import axios from 'axios';

const API_URL = 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/collections';

export const state = () => ({
  collections: [],
  isBusy: true,
  error: null,
  collectionsCount: 0,
  collectionDetails: null, // New state for collection details
});

export const getters = {
  ALL_COLLECTIONS: (state) => state.collections,
  IS_BUSY: (state) => state.isBusy,
  ERROR: (state) => state.error,
  COLLECTIONS_COUNT: (state) => state.collectionsCount,
  COLLECTION_DETAILS: (state) => state.collectionDetails, // Getter for collection details
};

export const mutations = {
  SET_COLLECTIONS(state, collections) {
    state.collections = Array.isArray(collections) ? collections : [];
    state.collectionsCount = state.collections.length;
    state.isBusy = false;
  },
  SET_IS_BUSY(state, isBusy) {
    state.isBusy = isBusy;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.isBusy = false;
  },
  ADD_COLLECTION(state, collection) {
    state.collections.push(collection);
    state.collectionsCount++;
  },
  UPDATE_COLLECTION(state, updatedCollection) {
    const index = state.collections.findIndex((collection) => collection._id === updatedCollection._id);
    if (index !== -1) {
      state.collections.splice(index, 1, updatedCollection);
    }
  },
  DELETE_COLLECTION(state, collectionId) {
    state.collections = state.collections.filter((collection) => collection._id !== collectionId);
    state.collectionsCount--;
  },
  SET_COLLECTION_DETAILS(state, collection) { // Mutation for setting collection details
    state.collectionDetails = collection;
  },
};

export const actions = {
  async fetchCollections({ commit }) {
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.get(API_URL);
      const collections = response.data.collections;
      if (Array.isArray(collections)) {
        commit('SET_COLLECTIONS', collections);
        console.log(collections);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while fetching collections.');
      console.error('Error fetching collections:', error);
    }
  },

  async fetchCollectionDetails({ commit }, collectionId) { // New action to fetch collection details
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.get(`${API_URL}/${collectionId}`);
      if (response.data && response.data.collection) {
        commit('SET_COLLECTION_DETAILS', response.data.collection); // Store collection details
      } else {
        throw new Error('Failed to fetch collection details.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while fetching collection details.');
      console.error('Error fetching collection details:', error);
    }
  },

  async addCollection({ commit }, collectionData) {
    try {
      const response = await axios.post(API_URL, collectionData);
      if (response.data && response.data.collection) {
        commit('ADD_COLLECTION', response.data.collection);
      } else {
        throw new Error('Failed to add collection.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while adding the collection.');
      console.error('Error adding collection:', error);
    }
  },

  async updateCollection({ commit }, { collectionId, collectionData }) {
    try {
        const requestData = {
            collection: collectionData,
            update_masks: [
                'name',                // Collection name
                'cover',               // Cover image URL
                'description',         // Description text
                'seo_metadata',        // SEO metadata (ensure collectionData.seo_metadata contains proper structure)
                'category',            // Category of the collection
                'is_pro',              // Pro status (boolean)
                'status',              // Collection status (boolean)
                'order',               // Order number
            ],
        };
        const response = await axios.put(`${API_URL}/${collectionId}`, requestData);
        if (response.status === 200 && response.data && response.data.collection) {
            commit('UPDATE_COLLECTION', response.data.collection);
        } else {
            throw new Error('Update failed: No collection returned.');
        }
    } catch (error) {
        commit('SET_ERROR', error.message || 'An error occurred while updating the collection.');
        console.error('Error updating collection:', error);
    }
}
,

  async deleteCollectionAction({ commit }, collectionId) {
    try {
      await axios.delete(`${API_URL}/${collectionId}`);
      commit('DELETE_COLLECTION', collectionId);
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while deleting the collection.');
      console.error('Error deleting collection:', error);
    }
  },
};

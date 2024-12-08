import axios from 'axios';

const API_URL = 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/suppliers';

export const state = () => ({
  suppliers: [],
  isBusy: true,
  error: null,
  suppliersCount: 0,
  supplierDetails: null, // New state for supplier details
});

export const getters = {
  ALL_SUPPLIERS: (state) => state.suppliers,
  IS_BUSY: (state) => state.isBusy,
  ERROR: (state) => state.error,
  SUPPLIERS_COUNT: (state) => state.suppliersCount,
  SUPPLIER_DETAILS: (state) => state.supplierDetails, // Getter for supplier details
};

export const mutations = {
  SET_SUPPLIERS(state, suppliers) {
    state.suppliers = Array.isArray(suppliers) ? suppliers : [];
    state.suppliersCount = state.suppliers.length;
    state.isBusy = false;
  },
  SET_IS_BUSY(state, isBusy) {
    state.isBusy = isBusy;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.isBusy = false;
  },
  ADD_SUPPLIER(state, supplier) {
    state.suppliers.push(supplier);
    state.suppliersCount++;
  },
  UPDATE_SUPPLIER(state, updatedSupplier) {
    const index = state.suppliers.findIndex((supplier) => supplier._id === updatedSupplier._id);
    if (index !== -1) {
      state.suppliers.splice(index, 1, updatedSupplier);
    }
  },
  DELETE_SUPPLIER(state, supplierId) {
    state.suppliers = state.suppliers.filter((supplier) => supplier._id !== supplierId);
    state.suppliersCount--;
  },
  SET_SUPPLIER_DETAILS(state, supplier) { // Mutation for setting supplier details
    state.supplierDetails = supplier;
  },
};

export const actions = {
  async fetchSuppliers({ commit }) {
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.get(API_URL);
      const suppliers = response.data.suppliers;
      if (Array.isArray(suppliers)) {
        commit('SET_SUPPLIERS', suppliers);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while fetching suppliers.');
      console.error('Error fetching suppliers:', error);
    }
  },

  async fetchSupplierDetails({ commit }, supplierId) { // New action to fetch supplier details
    commit('SET_IS_BUSY', true);
    try {
      const response = await axios.get(`${API_URL}/${supplierId}`);
      if (response.data && response.data.supplier) {
        commit('SET_SUPPLIER_DETAILS', response.data.supplier); // Store supplier details
      } else {
        throw new Error('Failed to fetch supplier details.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while fetching supplier details.');
      console.error('Error fetching supplier details:', error);
    }
  },

  async addSupplier({ commit }, supplierData) {
    try {
      const response = await axios.post(API_URL, supplierData);
      if (response.data && response.data.supplier) {
        commit('ADD_SUPPLIER', response.data.supplier);
      } else {
        throw new Error('Failed to add supplier.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while adding the supplier.');
      console.error('Error adding supplier:', error);
    }
  },

  async updateSupplier({ commit }, { supplierId, supplierData }) {
    try {
      const requestData = {
        supplier: supplierData,
        update_masks: [
          'name',              // Supplier name
          'phone',             // Phone number
          'email',             // Email address
          'website',           // Website URL
          'speciality',        // Supplier speciality
          'logo',              // Logo URL
          'description',       // Description text
          // Add more fields here as needed
        ],
      };
      console.log("request",requestData)
  
      const response = await axios.put(`${API_URL}/${supplierId}`, requestData);
      if (response.status === 200 && response.data && response.data.supplier) {
        commit('UPDATE_SUPPLIER', response.data.supplier);
      } else {
        throw new Error('Update failed: No supplier returned.');
      }
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while updating the supplier.');
      console.error('Error updating supplier:', error);
    }
  }
,  

  async deleteSupplierAction({ commit }, supplierId) {
    try {
      await axios.delete(`${API_URL}/${supplierId}`);
      commit('DELETE_SUPPLIER', supplierId);
    } catch (error) {
      commit('SET_ERROR', error.message || 'An error occurred while deleting the supplier.');
      console.error('Error deleting supplier:', error);
    }
  },
};

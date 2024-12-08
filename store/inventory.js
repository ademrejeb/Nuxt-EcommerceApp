import axios from 'axios';

const API_URL = 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/inventories';

export const state = () => ({
  inventories: [],
  pagination: {
    page: 1,
    totalPages: 0,
    total: 0,
    totalPerPage: 10,
  },
  filters: {
    name: '',
    sku: '',
    quantity: null,
    priceMin: null,
    priceMax: null,
    availability: false,
    productExternalID: '',
    storeExternalID: '',
  },
  loading: false,
  error: null,
});

export const mutations = {
  SET_INVENTORIES(state, inventories) {
    state.inventories = inventories;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters };
  },
};

export const actions = {
  async fetchInventories({ commit, state }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const params = {
        page: state.pagination.page,
        size: state.pagination.totalPerPage,
        ...state.filters,
      };

      const { data } = await axios.get(API_URL, { params });

      commit('SET_INVENTORIES', data.inventories);
      commit('SET_PAGINATION', {
        page: data.page,
        totalPages: data.total_pages,
        total: data.total,
        totalPerPage: data.total_per_page,
      });
    } catch (error) {
      commit('SET_ERROR', error.response ? error.response.data.message : error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  setFilters({ commit, dispatch }, filters) {
    commit('SET_FILTERS', filters);
    commit('SET_PAGINATION', { ...state.pagination, page: 1 }); // Reset to the first page
    dispatch('fetchInventories');
  },
  setPage({ commit, dispatch }, page) {
    commit('SET_PAGINATION', { ...state.pagination, page });
    dispatch('fetchInventories');
  },
};

export const getters = {
  inventories: (state) => state.inventories,
  pagination: (state) => state.pagination,
  filters: (state) => state.filters,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

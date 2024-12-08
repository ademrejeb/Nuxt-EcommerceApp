import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/packages",
  headers: {
    "Content-Type": "application/json",
  },
});

const state = {
  packages: [],
  package: null,
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

const getters = {
  allPackages: (state) => state.packages,
  singlePackage: (state) => state.package,
  totalPackages: (state) => state.total,
  totalPages: (state) => state.totalPages,
  isLoading: (state) => state.loading,
  errorMessage: (state) => state.error,
};

const mutations = {
  SET_PACKAGES(state, payload) {
    state.packages = payload.packages || [];
    state.total = payload.total || 0;
    state.totalPages = payload.totalPages || 0;
  },
  SET_PACKAGE(state, payload) {
    state.package = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
  UPDATE_PACKAGE(state, updatedPackage) {
    const index = state.packages.findIndex((pkg) => pkg.id === updatedPackage.id);
    if (index !== -1) {
      state.packages.splice(index, 1, updatedPackage);
    } else {
      console.warn(`Package with ID ${updatedPackage.id} not found.`);
    }
    if (state.package?.id === updatedPackage.id) {
      state.package = updatedPackage;
    }
  },
};

const actions = {
  async fetchPackages({ commit }, { page = 1, size = 10, query = {} } = {}) {
    if (state.loading) return;
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");
    try {
      const response = await apiClient.get("", { params: {  page, size, ...query } });
      console.log("Packages Fetched:", response.data);
      commit("SET_PACKAGES", response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch packages";
      commit("SET_ERROR", errorMessage);
      console.error("Fetch Packages Error:", errorMessage);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async addPackage({ commit }, packageData) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");
    try {
      const response = await apiClient.post("", packageData);
      console.log("Package Added:", response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add package";
      commit("SET_ERROR", errorMessage);
      console.error("Add Package Error:", errorMessage);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async updatePackage({ commit }, { id, packageData }) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");
    try {
      const requestData = {
        package: packageData,
        update_masks: Object.keys(packageData),
      };
      console.log("Updating Package:", requestData);
      const response = await apiClient.put(`/${id}`, requestData);
      console.log("Package Updated:", response.data);
      commit("UPDATE_PACKAGE", response.data.package);
      return response.data.package;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update package";
      commit("SET_ERROR", errorMessage);
      console.error("Update Package Error:", errorMessage);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async deletePackage({ commit }, id) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");
    try {
      await apiClient.delete(`/${id}`);
      console.log(`Package with ID ${id} deleted.`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete package";
      commit("SET_ERROR", errorMessage);
      console.error("Delete Package Error:", errorMessage);
      throw error;
    } finally {
      commit("SET_LOADING", false);
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

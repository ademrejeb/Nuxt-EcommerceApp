<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center text-primary">Categories Management</h1>

    <!-- Alert for Error -->
    <div v-if="ERROR" class="alert alert-danger" role="alert">
      {{ ERROR }}
    </div>

    <!-- Loading Spinner -->
    <div v-if="IS_BUSY" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Category List -->
    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Total Categories: {{ CATEGORIES_COUNT }}</h2>
        <button class="btn btn-primary" @click="showAddCategoryModal = true">
          Add Category
        </button>
      </div>

      <div class="row">
        <div
          v-for="category in ALL_CATEGORIES"
          :key="category.external_id"
          class="col-md-4 mb-4"
        >
          <div
            class="card shadow-sm border-0"
            :style="{ backgroundColor: category.background_color, color: category.foreground_color }"
          >
            <img
              :src="category.cover"
              class="card-img-top"
              :alt="category.name"
            />
            <div class="card-body">
              <h5 class="card-title">{{ category.name }}</h5>
              <p class="card-text">
                <strong>Language:</strong> {{ category.language }} <br />
                <strong>Category:</strong> {{ category.category }} <br />
                <strong>Description:</strong> {{ category.description }} <br />
                <strong>Order:</strong> {{ category.order }} <br />
                <strong>Status:</strong>
                <span
                  class="badge"
                  :class="category.status ? 'bg-success' : 'bg-danger'"
                >
                  {{ category.status ? 'Active' : 'Inactive' }}
                </span>
              </p>
              <div class="d-flex justify-content-between">
                <button
                  class="btn btn-warning btn-sm"
                  @click="editCategory(category)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteCategory(category.external_id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <add-edit-category-modal
      v-if="showAddCategoryModal || showEditCategoryModal"
      :category="selectedCategory"
      :is-edit="showEditCategoryModal"
      @close="closeModals"
      @save="handleSaveCategory"
    />
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import AddEditCategoryModal from '../../components/category/AddEditCategoryModal.vue';

export default {
  name: 'CategoryPage',
  components: {
    AddEditCategoryModal,
  },
  data() {
    return {
      showAddCategoryModal: false,
      showEditCategoryModal: false,
      selectedCategory: null,
    };
  },
  computed: {
    ...mapGetters('category', [
      'ALL_CATEGORIES',
      'IS_BUSY',
      'ERROR',
      'CATEGORIES_COUNT',
    ]),
  },
  methods: {
    ...mapActions('category', [
      'FETCH_CATEGORIES',
      'ADD_CATEGORY',
      'UPDATE_CATEGORY',
      'DELETE_CATEGORY',
    ]),
    editCategory(category) {
      this.selectedCategory = { ...category };
      this.showEditCategoryModal = true;
    },
    deleteCategory(categoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.DELETE_CATEGORY(categoryId);
      }
    },
    closeModals() {
      this.showAddCategoryModal = false;
      this.showEditCategoryModal = false;
      this.selectedCategory = null;
    },
    handleSaveCategory({ isEdit, category }) {
      if (isEdit) {

        console.log("eli jet " , category)
        console.log("ex id  " ,  this.selectedCategory.external_id)
        this.UPDATE_CATEGORY({
          categoryId: this.selectedCategory.external_id,
          categoryData: category,
        });
      } else {
        this.ADD_CATEGORY(category);
      }
      this.closeModals();
    },
  },
  mounted() {
    this.FETCH_CATEGORIES();
  },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.card {
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 10px;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

.card img {
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.badge {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}
</style>

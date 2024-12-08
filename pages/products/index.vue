<template>
  <div class="product-container">
    <h2>Products</h2>

    <!-- Product Cards -->
    <div class="product-cards">
      <div
        v-for="product in paginatedProducts"
        :key="product.external_id"
        class="product-card"
      >
        <el-image
          :src="product.cover || '/placeholder.jpg'"
          class="product-image"
          :alt="product.name"
          fit="cover"
        />
        <h3 class="product-name">{{ product.name || "No Name" }}</h3>
        <p class="product-price">{{ (product.price || 0).toFixed(2) }} USD</p>
        <p class="product-description">{{ product.description || "No description available" }}</p>
        <div class="card-actions">
          <el-button
            type="primary"
            icon="el-icon-view"
            @click="viewProductDetails(product.external_id)"
            circle
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="openEditModal(product)"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteProduct(product.external_id)"
            circle
          ></el-button>
        </div>
      </div>

      <!-- Add Product Card -->
      <div class="product-card add-product-card" @click="openAddModal">
        <el-button type="primary" icon="el-icon-plus" circle></el-button>
        <p>Add Product</p>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalProducts"
      layout="prev, pager, next"
    />

    <!-- Product Details Modal -->
    <el-dialog
      :visible.sync="showDetailsModal"
      width="80%"
      title="Product Details"
      @close="closeDetailsModal"
    >
      <template v-if="detailsProduct">
        <ProductDetailsComponent :product="detailsProduct" />
      </template>
      <template v-else>
        <p class="loading-text">Loading product details...</p>
      </template>
    </el-dialog>

    <!-- Product Form Modal -->
    <ProductForm
      :show-modal="showModal"
      :is-edit="isEdit"
      :product-data="productForm"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductForm from "~/components/products/ProductForm.vue";
import ProductDetailsComponent from "~/components/products/ProductDetailsComponent.vue";

export default {
  components: { ProductForm, ProductDetailsComponent },
  data() {
    return {
      showModal: false,
      isEdit: false,
      showDetailsModal: false,
      productForm: this.getEmptyProductForm(),
      detailsProduct: null,
      currentPage: 1,
      pageSize: 10,
      totalProducts: 0,
    };
  },
  computed: {
    ...mapGetters("catalog", ["ALL_PRODUCTS", "PRODUCT_DETAILS"]),
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.ALL_PRODUCTS.slice(start, start + this.pageSize);
    },
  },
  methods: {
    ...mapActions("catalog", [
      "FETCH_PRODUCTS",
      "ADD_PRODUCT",
      "DELETE_PRODUCT",
      "UPDATE_PRODUCT",
      "FETCH_PRODUCT_DETAILS",
    ]),
    async viewProductDetails(externalId) {
      this.detailsProduct = null;
      this.showDetailsModal = true;
      try {
        console.log("Fetching product details for ID:", externalId);
        const product = await this.FETCH_PRODUCT_DETAILS(externalId);
        if (product) {
          this.detailsProduct = product;
          console.log("Product details fetched successfully:", this.detailsProduct);
        } else {
          console.error("Product details not found for ID:", externalId);
          this.showDetailsModal = false;
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
        this.showDetailsModal = false;
      }
    },
    openAddModal() {
      this.resetForm();
      this.isEdit = false;
      this.showModal = true;
    },
    openEditModal(product) {
      this.productForm = { ...product };
      this.isEdit = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
    },
    async handleSubmit(formData) {
      try {
        if (this.isEdit) {
          await this.UPDATE_PRODUCT({
            productId: formData.external_id,
            productData: formData,
          });
        } else {
          await this.ADD_PRODUCT(formData);
        }
        this.fetchProducts();
        this.closeModal();
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    },
    async deleteProduct(productId) {
      try {
        await this.DELETE_PRODUCT(productId);
        this.fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchProducts();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchProducts();
    },
    async fetchProducts() {
      try {
        await this.FETCH_PRODUCTS();
        this.totalProducts = this.ALL_PRODUCTS.length;
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    },
    resetForm() {
      this.productForm = this.getEmptyProductForm();
    },
    getEmptyProductForm() {
      return {
        name: "",
        description: "",
        categories: [],
        tags: [],
        cover: "",
        pictures: [],
        videos: [],
        price: 0,
        price_before_discount: 0,
        availability: true,
        quantity: 0,
        options: [],
        seo_metadata: { title: "", description: "", slug: "" },
      };
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>


<style scoped>
/* General Layout */
.product-container {
  width: 90%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

/* Page Title */
h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  text-align: center;
  margin-bottom: 30px;
}

/* Product Cards Container */
.product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

/* Product Card */
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 280px;
  min-height: 380px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
}

.product-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

/* Add Product Card */
.add-product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 380px;
  padding: 20px;
  background-color: #f0f8ff;
  border: 2px dashed #007bff;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.add-product-card:hover {
  transform: scale(1.05);
  background-color: #e6f3ff;
}

/* Product Image */
.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Product Name */
.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
}

/* Product Price */
.product-price {
  font-size: 1rem;
  font-weight: 500;
  color: #007bff;
  margin: 5px 0;
}

/* Product Description */
.product-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
  text-align: center;
}

/* Button Group */
.card-actions {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-top: 15px;
}

.el-button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.el-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

/* Pagination */
.el-pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.el-pagination .el-pager li.active {
  background-color: #007bff;
  color: #ffffff;
}

/* Dialog */
.el-dialog {
  border-radius: 10px;
  overflow: hidden;
}

.el-dialog__header {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  background-color: #f9f9f9;
  padding: 15px;
}

.el-dialog__body {
  padding: 20px;
  color: #555;
}

.el-dialog__footer {
  text-align: center;
}

.el-dialog__footer .el-button {
  margin: 0 5px;
}

/* Details Component */
.details-container {
  padding: 20px;
  font-size: 1rem;
  color: #555;
}

.details-header {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
}

.details-list {
  list-style: none;
  padding: 0;
}

.details-list li {
  margin-bottom: 10px;
}

.details-label {
  font-weight: bold;
  color: #333;
}

.details-value {
  color: #555;
}

/* Loading Text */
.loading-text {
  font-size: 1.2rem;
  text-align: center;
  color: #999;
}
</style>

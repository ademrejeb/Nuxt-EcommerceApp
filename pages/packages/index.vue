<template>
  <div class="packages">


    <!-- Package Cards -->
    <h2 class="text-center mb-4">Package Management</h2>

  <!-- Package Cards -->
  <div class="row package-cards">
    <!-- Package Card -->
    <div
      v-for="packageItem in paginatedPackages"
      :key="packageItem.external_id"
      class="col-lg-4 col-md-6 mb-4"
    >
      <div class="card package-card">
        <img
          :src="packageItem.cover || 'https://via.placeholder.com/300x200'"
          class="card-img-top"
          :alt="packageItem.name || 'Unnamed Package'"
        />
        <div class="card-body">
          <h5 class="card-title text-truncate">
            {{ packageItem.name || "Unnamed Package" }}
          </h5>
          <p class="card-text package-price">
            <strong>{{ packageItem.final_price || "N/A" }}</strong> USD
          </p>
          <p class="card-text package-description text-truncate">
            {{ packageItem.description || "No description available" }}
          </p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button
            class="btn btn-info btn-sm"
            @click="openDetailsModal(packageItem)"
            title="View Details"
          >
            <i class="fas fa-eye"></i> View
          </button>
          <button
            class="btn btn-success btn-sm"
            @click="openEditModal(packageItem)"
            title="Edit"
          >
            <i class="fas fa-edit"></i> Edit
          </button>
          <button
            class="btn btn-danger btn-sm"
            @click="deletePackag(packageItem.external_id)"
            title="Delete"
          >
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
   
    <!-- Add Package Card -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card add-package-card text-center">
        <div
  class="card-body d-flex flex-column justify-content-center align-items-center"
  @click="openAddModal"
>
  <button class="btn btn-primary btn-circle">
    <i class="fas fa-plus fa-2x"></i>
  </button>
  <p class="mt-3">Add Package</p>
</div>


      </div>
    </div>


  <!-- View Details Modal -->
  <el-dialog
    :visible.sync="showDetailsModal"
    title="Product Details"
    width="60%"
    @close="closeDetailsModal"
  >
    <div v-if="detailspackage" class="details-container">
      <!-- Main Product Display -->
      <div class="main-product-section">
        <div class="product-image">
          <img
            :src="detailspackage.cover || 'https://via.placeholder.com/300x300'"
            alt="Main Product Image"
            class="main-image"
          />
        </div>
        <div class="product-info">
          <h3>{{ detailspackage.name || "Unnamed Product" }}</h3>
          <p class="price">{{ detailspackage.final_price || "N/A" }} TND</p>
          <p class="description">
            {{ detailspackage.description || "No description available" }}
          </p>
          <p><strong>SKU:</strong> {{ detailspackage.bar_code || "N/A" }}</p>
          <p><strong>Status:</strong> {{ detailspackage.status || "Unknown" }}</p>
        </div>
      </div>

      <!-- Additional Images -->
      <div class="additional-images-section">
        
        <div class="additional-images">
          <img
            v-for="(picture, index) in detailspackage.pictures"
            :key="index"
            :src="picture"
            alt="Additional Image"
            class="additional-image"
          />
        </div>
      </div>
<div>
      <!-- Delivery Details -->
      <div
        v-if="detailspackage.delivery_details"
        class="delivery-details-section"
      >
        <h4>Delivery Information</h4>
        <p>
          <strong>Weight:</strong> {{ detailspackage.delivery_details.weight || "N/A" }}
          {{ detailspackage.delivery_details.weight_unit || "" }}
        </p>
        <p>
          <strong>Dimensions:</strong>
          {{ detailspackage.delivery_details.width || "N/A" }} x
          {{ detailspackage.delivery_details.height || "N/A" }} x
          {{ detailspackage.delivery_details.depth || "N/A" }}
          ({{ detailspackage.delivery_details.dimension_unit || "" }})
        </p>
      </div>
    </div>
      <!-- Related Products -->
      <div class="products-section">
        <h4>Similar Products</h4>
        <ul class="products-list">
          <li
            v-for="(product, index) in detailspackage.package_products"
            :key="index"
            class="product-item"
          >
            <img
              :src="product.product_info.cover || 'https://via.placeholder.com/50x50'"
              alt="Product Image"
              class="product-image"
            />
            <span>{{ product.product_info.name || "Unknown Product" }}</span>
          </li>
        </ul>
      </div>
    </div>

    <template #footer>
      <el-button @click="closeDetailsModal">Close</el-button>
    </template>
  </el-dialog>



  
  </div>

  <!-- Pagination -->
  <div class="mt-4 d-flex justify-content-center">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalPackages"
      layout="total, sizes, prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
    />
  </div>
    <!-- Package Form Modal -->
    <el-dialog :visible.sync="showModal" :title="isEdit ? 'Edit Package' : 'Add Package'" width="50%" @close="closeModal">
  <el-form :model="packageForm" ref="packageForm" label-width="120px">

    
  <div class="multi-step-form">
    <!-- Stepper Navigation -->
    <el-steps :active="currentStep" finish-status="success">
      <el-step title="Basic Information"></el-step>
      <el-step title="Media Upload"></el-step>
      <el-step title="Pricing & Tax"></el-step>
      <el-step title="Products"></el-step>
      <el-step title="Delivery Details"></el-step>
      <el-step title="Supplier"></el-step>
    </el-steps>

    <!-- Step Content -->
    <div class="step-content">
      <!-- Step 1: Basic Information -->
      <div v-if="currentStep === 0">
        <el-form-item label="Name" required>
          <el-input v-model="packageForm.name" placeholder="Enter package name" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            v-model="packageForm.description"
            type="textarea"
            placeholder="Enter package description"
          />
        </el-form-item>
        <el-form-item label="Inventory Quantity">
          <el-input-number v-model="packageForm.inventory_quantity" :min="0" />
        </el-form-item>
      </div>

      <!-- Step 2: Media Upload -->
      <div v-if="currentStep === 1">
        <el-form-item label="Cover Image">
          <el-upload
            action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
            list-type="picture-card"
            :on-success="handleCoverUpload"
            :file-list="coverFileList"
            :auto-upload="true"
            :before-upload="validateImage"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Additional Images">
          <el-upload
            action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
            list-type="picture-card"
            multiple
            :on-success="handleImageUpload"
            :file-list="picturesFileList"
            :auto-upload="true"
            :before-upload="validateImage"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Videos">
          <el-upload
            action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
            list-type="text"
            multiple
            :on-success="handleVideoUpload"
            :file-list="videosFileList"
            :auto-upload="true"
            :before-upload="validateVideo"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>

      <!-- Step 3: Pricing & Tax -->
      <div v-if="currentStep === 2">
        <el-form-item label="Price Before Discount">
          <el-input-number v-model="packageForm.price_before_discount" :min="0" />
        </el-form-item>
        <el-form-item label="Final Price" required>
          <el-input-number v-model="packageForm.final_price" :min="0" />
        </el-form-item>
        <el-form-item label="Tax Details">
          <el-switch
            v-model="packageForm.tax_details.with_tax"
            active-text="Tax Included"
            inactive-text="Tax Excluded"
          />
          <el-form-item label="Tax Label">
            <el-input v-model="packageForm.tax_details.tax_label" placeholder="Enter tax label" />
          </el-form-item>
          <el-form-item label="Tax Value">
            <el-input-number
              v-model="packageForm.tax_details.tax_value"
              :min="0"
              placeholder="Enter tax value"
            />
          </el-form-item>
        </el-form-item>
      </div>

      <!-- Step 4: Products -->
      <div v-if="currentStep === 3">
        <el-form-item label="Package Products">
          <div v-for="(product, index) in packageForm.package_products" :key="index">
            <el-input
              v-model="product.product_external_id"
              placeholder="Enter Product External ID"
            />
            <el-input-number
              v-model="product.quantity"
              placeholder="Enter Quantity"
              :min="1"
            />
            <el-button type="danger" @click="removePackageProduct(index)">Remove</el-button>
          </div>
          <el-form-item label="Package Products">
            <el-select v-model="selectedProduct" placeholder="Select a Product">
              <el-option
                v-for="product in productOptions"
                :key="product.id"
                :label="product.name"
                :value="product.id"
              >
                <div class="product-option">
                  <img :src="product.cover" alt="Product Cover" class="product-cover" />
                  <span>{{ product.name }}</span>
                </div>
              </el-option>
            </el-select>
            <el-button type="primary" @click="addProductToPackage">Add Product</el-button>
          </el-form-item>
        </el-form-item>
      </div>

      <!-- Step 5: Delivery Details -->
      <div v-if="currentStep === 4">
        <el-form-item label="Dimension Unit">
          <el-input
            v-model="packageForm.delivery_details.dimension_unit"
            placeholder="Enter dimension unit (e.g., cm, inch)"
          />
        </el-form-item>
        <el-form-item label="Weight Unit">
          <el-input
            v-model="packageForm.delivery_details.weight_unit"
            placeholder="Enter weight unit (e.g., kg, lbs)"
          />
        </el-form-item>
        <el-form-item label="Weight">
          <el-input-number
            v-model="packageForm.delivery_details.weight"
            :min="0"
            placeholder="Enter weight"
          />
        </el-form-item>
        <el-form-item label="Width">
          <el-input-number
            v-model="packageForm.delivery_details.width"
            :min="0"
            placeholder="Enter width"
          />
        </el-form-item>
        <el-form-item label="Height">
          <el-input-number
            v-model="packageForm.delivery_details.height"
            :min="0"
            placeholder="Enter height"
          />
        </el-form-item>
        <el-form-item label="Depth">
          <el-input-number
            v-model="packageForm.delivery_details.depth"
            :min="0"
            placeholder="Enter depth"
          />
        </el-form-item>
      </div>

      <!-- Step 6: Supplier -->
      <div v-if="currentStep === 5">
        <el-form-item label="Supplier">
          <el-select v-model="selectedSupplier" placeholder="Select a Supplier">
            <el-option
              v-for="supplier in supplierOptions"
              :key="supplier.id"
              :label="supplier.name"
              :value="supplier.id"
            />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="form-navigation">
      <el-button v-if="currentStep > 0" @click="prevStep" type="default">Previous</el-button>
      <el-button v-if="currentStep < steps - 1" @click="nextStep" type="primary">Next</el-button>
      <el-button v-if="currentStep === steps - 1" @click="submitForm" type="success">Submit</el-button>
    </div>
  </div>



  </el-form>
</el-dialog>

  </div>
</template>

<script>
import { Package, PackageUpsert, PackageProduct } from "../../models/package";
import { mapGetters, mapActions } from "vuex";

export default {
  
  data() {
    return {

      external_idedit :null,
      detailspackage : null,
      showDetailsModal: false, // State for the details modal
      selectedPackage: null, // State for the currently selected package
      currentStep: 0,
      steps: 6,
      productOptions: [], // Holds the processed products for dropdown
    selectedProduct: null, // Holds the selected product ID
    productList: [], // List of selected products
      supplierOptions: [], // Holds the processed suppliers for dropdown
      selectedSupplier: null, // Holds the selected supplier ID
      coverFileList: [],
      picturesFileList: [],
      videosFileList: [],
      showModal: false,
      isEdit: false,
      packageForm: null,
      newTag: "",
      newPackageProduct: { product_external_id: "", quantity: 1 },
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapGetters('supplier', ['ALL_SUPPLIERS']),
    ...mapGetters('catalog', ['ALL_PRODUCTS']),
    ...mapGetters("packages", ["allPackages", "totalPackages"]),
    paginatedPackages() {
      return this.allPackages.map(pkg => new Package(pkg));
    },
  },
  methods: {
    ...mapActions("packages", ["fetchPackages", "addPackage", "updatePackage", "deletePackage"]),
    ...mapActions('supplier', ['fetchSuppliers']),

   ...mapActions('catalog', ['FETCH_PRODUCTS']),

   openDetailsModal(packageItem) {
      this.detailspackage= packageItem; // Set the selected package
      this.showDetailsModal = true; // Open the modal
      console.log("ddff", this.detailspackage)
    },

    // Method to close the details modal
    closeDetailsModal() {
      this.detailspackage = null; // Clear the selected package
      this.showDetailsModal = false; // Close the modal
    },

   nextStep() {
      if (this.currentStep < this.steps - 1) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },


  loadProducts() {
    if (this.ALL_PRODUCTS && this.ALL_PRODUCTS.length) {
      this.productOptions = this.ALL_PRODUCTS.map((product) => ({
        id: product.external_id || product.id, // Adjust based on your API field naming
        name: product.name,
        cover: product.cover || '', // Ensure the cover field exists in the API response
      }));
    } else {
      console.warn("No products available to load.");
    }
  },
  addProductToPackage() {
    const selected = this.productOptions.find((product) => product.id === this.selectedProduct);
    if (selected && !this.packageForm.package_products.find((p) => p.product_external_id === selected.id)) {
      this.packageForm.package_products.push({
        product_external_id: selected.id,
        quantity: 1, // Default quantity
        product_info: { name: selected.name, cover: selected.cover },
      });
      this.selectedProduct = null; // Reset selection

    } else {
      this.$message.warning("Product already added or invalid selection.");
    }
  },
  removeProductFromPackage(index) {
    this.packageForm.package_products.splice(index, 1);
  },

  loadSuppliers() {
    if (this.ALL_SUPPLIERS && this.ALL_SUPPLIERS.length) {
      this.supplierOptions = this.ALL_SUPPLIERS.map((supplier) => ({
        id: supplier.external_id || supplier._id, // Adjust based on your API field naming
        name: supplier.name,
      }));
    } else {
      console.warn("No suppliers available to load.");
    }
  },
    getEmptyPackageForm() {
      return new PackageUpsert({
        status: "Inactive",
        name: "",
        description: "",
        description_label: "",
        cover: "",
        final_price: 0,
        price_before_discount: 0,
        seo_metadata: { title: "", description: "" },
        tags: [],
        pictures: [],
        videos: [],
        seller_id: "SELLER-id",
        package_products: [],
        tax_details: {
      with_tax: false,
      tax_label: "",
      tax_value: 0,

    },
    delivery_details: {
      dimension_unit: "",
      weight_unit: "",
      weight: 0,
      width: 0,
      height: 0,
      depth: 0,
    },

      });
    },
    initializeForm() {
      if (!this.packageForm) this.packageForm = this.getEmptyPackageForm();
    },
    async openAddModal() {
      this.packageForm = this.getEmptyPackageForm();
      this.isEdit = false;
      this.showModal = true;
    },
    async openEditModal(packageItem) {
      this.packageForm = new PackageUpsert(packageItem);
      this.external_idedit= packageItem.external_id;
      this.isEdit = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    handleCoverUpload(response) {
  try {
    const coverUrl = response.url || response.imageURL; 
    if (coverUrl) {
      this.packageForm.cover = coverUrl; // Set cover image
      console.log("Cover image uploaded successfully:", coverUrl);
      this.coverFileList = [{ name: response.name || "Cover Image", url: coverUrl }];
    } else {
      console.error("Cover image upload failed, response missing expected URL keys:", response);
    }
  } catch (error) {
    console.error("Error handling cover upload:", error);
  }
}
,
handleImageUpload(response) {
  try {
    const imageUrl = response.url || response.imageURL;
    if (imageUrl) {
      this.packageForm.pictures.push(imageUrl); // Add to pictures array
      this.picturesFileList.push({ name: response.name || "Uploaded Image", url: imageUrl });
      console.log("Image uploaded successfully:", imageUrl);
    } else {
      console.error("Image upload failed, response missing expected URL keys:", response);
    }
  } catch (error) {
    console.error("Error handling image upload:", error);
  }
}
,
    handleVideoUpload(response) {
      if (response && response.url) {
        this.packageForm.videos.push(response.url);
        this.videosFileList.push({ name: response.name, url: response.url });
        console.log("Video uploaded:", response);
      } else {
        console.error("Video upload failed:", response);
      }
    },
    validateImage(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) {
    this.$message.error('Only JPG/PNG images are allowed!');
  }
  if (!isLt2M) {
    this.$message.error('Image size must be less than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
,

    async submitForm() {
  try {
    const payload = { ...this.packageForm };


    payload.delivery_details = {
  dimension_unit: payload.delivery_details.dimension_unit || "N/A",
  weight_unit: payload.delivery_details.weight_unit || "N/A",
  weight: payload.delivery_details.weight || 0,
  width: payload.delivery_details.width || 0,
  height: payload.delivery_details.height || 0,
  depth: payload.delivery_details.depth || 0,
};

    payload.tax_details = {
      with_tax: payload.tax_details.with_tax || false,
      tax_label: payload.tax_details.tax_label || "N/A",
      tax_value: payload.tax_details.tax_value || 0,
    };
    payload.attributes_label = payload.attributes_label || "Default Attributes Label";
    payload.attributs = payload.attributs || [];
    payload.bar_code = payload.bar_code || "N/A";
    payload.status = payload.status || "Inactive";

    payload.categories = payload.categories || ["Uncategorized"];
    payload.categories_info = payload.categories_info || [];
    payload.constructor_country = payload.constructor_country || "Unknown";
    payload.cost = payload.cost || 0;
    payload.cover = payload.cover || "https://example.com/default-cover.jpg";
  
    payload.supplier = this.selectedSupplier;
    payload.stores = payload.stores || [];

    payload.package_products = payload.package_products.map((product) => ({
      quantity: product.quantity || 1,
      product_external_id: product.product_external_id || "Unknown",
      product_info: product.product_info || {
        product_external_id: "Unknown",
        name: "Default Product",
        sku: "N/A",
        cover: "https://example.com/default-product-cover.jpg",
      },
    }));

    payload.inventory_quantity = payload.inventory_quantity || 1;
    payload.weight = payload.weight || 1;

    console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

    if (this.isEdit) {

      await this.updatePackage({ id: this.external_idedit, packageData: payload });
      await this.fetchPackages({ page: this.currentPage, size: this.pageSize });
      this.currentStep=0;
    } else {
      await this.addPackage(payload);
      await this.fetchPackages({ page: this.currentPage, size: this.pageSize });
      this.currentStep=0;
    }

    await this.fetchPackages({ page: this.currentPage, size: this.pageSize });
    this.closeModal();
  } catch (error) {
    console.error("Error submitting package form:", error.message);
  }
}
,

    async deletePackag(packageId) {
      try {
        await this.deletePackage(packageId);
        await this.fetchPackages({ page: this.currentPage, size: this.pageSize });
      } catch (error) {
        console.error("Error deleting package:", error.message);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchPackages({ page, size: this.pageSize });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchPackages({ page: this.currentPage, size });
    },
    addTag() {
      if (this.newTag.trim()) {
        this.packageForm.tags.push(this.newTag.trim());
        this.newTag = "";
      }
    },
    removeTag(tag) {
      this.packageForm.tags = this.packageForm.tags.filter(t => t !== tag);
    },
    addPicture() {
      this.packageForm.pictures.push("");
    },
    addVideo() {
      this.packageForm.videos.push("");
    },
    addPackageProduct() {
      if (this.newPackageProduct.product_external_id.trim()) {
        this.packageForm.package_products.push({ ...this.newPackageProduct });
        this.newPackageProduct = { product_external_id: "", quantity: 1 };
      }
    },
    removePackageProduct(index) {
      this.packageForm.package_products.splice(index, 1);
    },
  },
  mounted() {
    this.FETCH_PRODUCTS()
    .then(() => {
      this.loadProducts();
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });


    this.fetchPackages({ page: this.currentPage, size: this.pageSize });
    this.fetchSuppliers()
    .then(() => {
      this.loadSuppliers();
    })
    .catch((error) => {
      console.error("Error fetching suppliers:", error);
    });
  },
  created() {
    this.initializeForm();
  },
};
</script>

<style scoped>
/* General Styles */
.packages {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
}

/* Package Cards */
.package-cards .card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-cards .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.package-price {
  font-size: 16px;
  color: #007bff;
  margin-bottom: 10px;
}

.package-description {
  font-size: 14px;
  color: #666;
}

/* Card Footer Buttons */
.card-footer {
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
}

.card-footer .btn {
  flex-grow: 1;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.card-footer .btn-info:hover {
  background-color: #0056b3;
  color: #fff;
}

.card-footer .btn-success:hover {
  background-color: #218838;
  color: #fff;
}

.card-footer .btn-danger:hover {
  background-color: #c82333;
  color: #fff;
}

/* Add Package Card */
.add-package-card {
  border: 2px dashed #007bff;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-package-card:hover {
  background-color: #e9f5ff;
  transform: translateY(-5px);
}


.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin-top: 10%;
}

.card-footer .btn {
  margin: 0 5px;
}

.add-package-card .btn-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-package-card p {
  font-size: 16px;
  font-weight: 500;
  color: #007bff;
}

/* Pagination */
.el-pagination {
  margin-top: 20px;
}.details-container {
  padding: 20px;
}
.main-product-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.product-image {
  flex: 1;
}
.main-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.product-info {
  flex: 2;
}
.price {
  font-size: 1.5em;
  color: #ff5722;
  margin: 10px 0;
}
.additional-images-section {
  margin-top: 80px;
}
.delivery-details-section {
  margin-top: 60px;
}
.products-section {
  margin-top: 30px;
}
.additional-images {
  display: flex;
  gap: 10px;
}
.additional-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.products-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}
.product-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.product-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>


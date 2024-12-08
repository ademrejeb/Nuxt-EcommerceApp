<template>
  <div class="modal fade" id="viewDetailsModal" tabindex="-1" aria-labelledby="viewDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewDetailsModalLabel">Package Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeDetailsModal"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <!-- Package Basic Info -->
            <div class="row mb-3">
              <div class="col-md-4">
                <img
                  :src="packageItem.cover || 'https://via.placeholder.com/300x200'"
                  class="img-fluid rounded"
                  :alt="packageItem.name || 'Unnamed Package'"
                />
              </div>
              <div class="col-md-8">
                <h3>{{ packageItem.name || "Unnamed Package" }}</h3>
                <p><strong>Description:</strong> {{ packageItem.description || "No description available" }}</p>
                <p><strong>Price:</strong> {{ packageItem.final_price || "N/A" }} USD</p>
                <p><strong>Status:</strong> {{ packageItem.status || "Unknown" }}</p>
           
                <p><strong>SKU:</strong> {{ packageItem.sku || "N/A" }}</p>
              </div>
            </div>

            <!-- Additional Images -->
            <div v-if="packageItem.pictures && packageItem.pictures.length > 0" class="mb-3">
              <h5>Additional Images</h5>
              <div class="row">
                <div v-for="(picture, index) in packageItem.pictures" :key="index" class="col-md-4 mb-2">
                  <img :src="picture" class="img-thumbnail" :alt="'Picture ' + (index + 1)" />
                </div>
              </div>
            </div>

            <!-- Videos -->
            <div v-if="packageItem.videos && packageItem.videos.length > 0" class="mb-3">
              <h5>Videos</h5>
              <ul>
                <li v-for="(video, index) in packageItem.videos" :key="index">
                  <a :href="video" target="_blank">Video {{ index + 1 }}</a>
                </li>
              </ul>
            </div>

            <!-- Supplier and Brand Info -->
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Supplier:</strong> {{ packageItem.supplier || "N/A" }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Brand:</strong> {{ packageItem.brand || "N/A" }}</p>
              </div>
            </div>

            <!-- Tax Details -->
            <div v-if="packageItem.tax_details" class="mb-3">
              <h5>Tax Details</h5>
              <p><strong>With Tax:</strong> {{ packageItem.tax_details.with_tax ? "Yes" : "No" }}</p>
              <p><strong>Tax Label:</strong> {{ packageItem.tax_details.tax_label || "N/A" }}</p>
              <p><strong>Tax Value:</strong> {{ packageItem.tax_details.tax_value || 0 }}</p>
            </div>

            <!-- Delivery Details -->
            <div v-if="packageItem.delivery_details" class="mb-3">
              <h5>Delivery Details</h5>
              <p><strong>Weight:</strong> {{ packageItem.delivery_details.weight || "N/A" }} {{ packageItem.delivery_details.weight_unit || "" }}</p>
              <p><strong>Dimensions:</strong> 
                {{ packageItem.delivery_details.width || "N/A" }} x 
                {{ packageItem.delivery_details.height || "N/A" }} x 
                {{ packageItem.delivery_details.depth || "N/A" }} 
                ({{ packageItem.delivery_details.dimension_unit || "" }})
              </p>
            </div>

            <!-- Package Products -->
            <div v-if="packageItem.package_products && packageItem.package_products.length > 0" class="mb-3">
              <h5>Package Products</h5>
              <ul>
                <li v-for="(product, index) in packageItem.package_products" :key="index">
                  {{ product.product_info.name || "Unknown Product" }} - Quantity: {{ product.quantity }}
                </li>
              </ul>
            </div>

            <!-- Categories -->
            <div v-if="packageItem.categories && packageItem.categories.length > 0" class="mb-3">
              <h5>Categories</h5>
              <ul>
                <li v-for="(category, index) in packageItem.categories" :key="index">
                  {{ category }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeDetailsModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewDetailsModalComponent",
  props: {
  packageItem: {
    type: Object,
    required: true,
   
  },
},

  methods: {
    closeDetailsModal() {
      this.$emit("close"); // Emit close event to parent component
    },
  },
  mounted() {
   console.log ("ssssss",this.packageItem);
  },

};

</script>

<style scoped>
.modal-body img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.modal-body .row {
  margin-bottom: 20px;
}

.modal-body h5 {
  margin-bottom: 15px;
}

.modal-body p {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
}

.modal-footer {
  border-top: 1px solid #e0e0e0;
  text-align: right;
}

.modal-footer .btn {
  margin-left: 5px;
}
</style>

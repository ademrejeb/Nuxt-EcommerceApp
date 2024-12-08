<template>
  <div class="product-details-container">
    <!-- Title -->
    <h2 class="product-title">{{ product.name || "Unnamed Product" }}</h2>

    <!-- Main Product Details -->
    <div class="main-details">
      <!-- Product Cover -->
      <el-image
        class="product-cover"
        :src="product.cover || '/placeholder.jpg'"
        alt="Product Cover"
        fit="cover"
      />
      <!-- Product Info -->
      <div class="product-info">
        <p><strong>Description:</strong> {{ product.description || "N/A" }}</p>
        <p><strong>Price:</strong> {{ product.price ? `$${product.price.toFixed(2)}` : "N/A" }}</p>
        <p>
          <strong>Price Before Discount:</strong>
          {{ product.price_before_discount
            ? `$${product.price_before_discount.toFixed(2)}`
            : "N/A" }}
        </p>
        <p><strong>Availability:</strong> {{ product.availability ? "In Stock" : "Out of Stock" }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity || "N/A" }}</p>
        <p>
          <strong>Categories:</strong>
          {{ product.categories && product.categories.length > 0
            ? product.categories.join(", ")
            : "N/A" }}
        </p>
        <p>
          <strong>Tags:</strong>
          {{ product.tags && product.tags.length > 0
            ? product.tags.join(", ")
            : "N/A" }}
        </p>
      </div>
    </div>

    <!-- Additional Details -->
    <div class="additional-details">
      <h3>Additional Information</h3>
      <p><strong>Created At:</strong> {{ formatDate(product.created_at) }}</p>
      <p><strong>Updated At:</strong> {{ formatDate(product.updated_at) }}</p>

      <!-- Pictures Gallery -->
      <div v-if="product.pictures && product.pictures.length > 0" class="pictures-gallery">
        <h3>Pictures</h3>
        <div v-for="(picture, index) in product.pictures" :key="index" class="picture-item">
          <el-image
            :src="picture"
            class="product-picture"
            :alt="`Picture ${index + 1}`"
            fit="cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailsComponent",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "N/A";
      const formattedDate = new Date(date);
      return formattedDate.toLocaleString();
    },
  },
};
</script>

<style scoped>
.product-details-container {
  width: 90%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 2.2rem;
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

.main-details {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.product-cover {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
}

.product-info p {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #333;
}

.additional-details h3 {
  font-size: 1.5rem;
  color: #007bff;
  margin-top: 20px;
  margin-bottom: 10px;
}

.additional-details p {
  font-size: 1rem;
  color: #555;
}

.pictures-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.product-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>

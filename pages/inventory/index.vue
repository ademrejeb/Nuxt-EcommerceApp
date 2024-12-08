<template>
  <div class="inventory-page">
    <h1>Inventories</h1>

    <!-- Filters Section -->
    <div class="filters">
      <div class="filter-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="filters.name" placeholder="Filter by name" />
      </div>
      <div class="filter-group">
        <label for="sku">SKU</label>
        <input type="text" id="sku" v-model="filters.sku" placeholder="Filter by SKU" />
      </div>
      <div class="filter-group">
        <label for="availability">Availability</label>
        <select id="availability" v-model="filters.availability">
          <option value="">All</option>
          <option :value="true">Available</option>
          <option :value="false">Not Available</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="price">Price Range</label>
        <input type="number" id="priceMin" v-model="filters.priceMin" placeholder="Min Price" />
        <input type="number" id="priceMax" v-model="filters.priceMax" placeholder="Max Price" />
      </div>
      <div class="filter-group">
        <label for="quantity">Quantity Range</label>
        <input type="number" id="quantityMin" v-model="filters.quantityMin" placeholder="Min Quantity" />
        <input type="number" id="quantityMax" v-model="filters.quantityMax" placeholder="Max Quantity" />
      </div>
    </div>

    <!-- Inventory List -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="inventory-list">
        <div
          v-for="inventory in filteredInventories"
          :key="inventory._id"
          class="inventory-item"
        >
          <img 
            :src="inventory.pictures && inventory.pictures.length > 0 
                    ? inventory.pictures[0] 
                    : 'https://via.placeholder.com/150'"
            alt="Inventory Image"
          />
          <h2>{{ inventory.name }}</h2>
          <p>Price: ${{ inventory.unit_price }}</p>
          <p>Quantity: {{ inventory.quantity }}</p>
          <p>Availability: {{ inventory.availability ? "Available" : "Not Available" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      filters: {
        name: '',
        sku: '',
        availability: '',
        priceMin: null,
        priceMax: null,
        quantityMin: null,
        quantityMax: null,
      },
    };
  },
  computed: {
    ...mapState('inventory', ['inventories', 'loading', 'error']),
    filteredInventories() {
      return this.inventories.filter((inventory) => {
        // Filter by Name
        if (this.filters.name && !inventory.name.toLowerCase().includes(this.filters.name.toLowerCase())) {
          return false;
        }
        // Filter by SKU
        if (this.filters.sku && !inventory.sku?.toLowerCase().includes(this.filters.sku.toLowerCase())) {
          return false;
        }
        // Filter by Availability
        if (this.filters.availability !== '' && inventory.availability !== JSON.parse(this.filters.availability)) {
          return false;
        }
        // Filter by Price Range
        if (this.filters.priceMin !== null && inventory.unit_price < this.filters.priceMin) {
          return false;
        }
        if (this.filters.priceMax !== null && inventory.unit_price > this.filters.priceMax) {
          return false;
        }
        // Filter by Quantity Range
        if (this.filters.quantityMin !== null && inventory.quantity < this.filters.quantityMin) {
          return false;
        }
        if (this.filters.quantityMax !== null && inventory.quantity > this.filters.quantityMax) {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    ...mapActions('inventory', ['fetchInventories']),
  },
  mounted() {
    this.fetchInventories();
  },
};
</script>





<style scoped>
/* General Page Styling */
.inventory-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* Filters Section */
.filters {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  width: calc(33.33% - 20px);
  min-width: 200px;
}

.filter-group label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
}

.filter-group input,
.filter-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.filter-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
}

.filter-actions button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-actions button:hover {
  background-color: #0056b3;
}

.filter-actions button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

/* Inventory List Styling */
.inventory-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.inventory-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.inventory-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.inventory-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.inventory-item h2 {
  font-size: 18px;
  margin: 10px 0;
  color: #333;
}

.inventory-item p {
  font-size: 14px;
  margin: 5px 0;
  color: #666;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  font-size: 14px;
  color: #333;
}

/* Loading and Error States */
.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.error {
  text-align: center;
  color: red;
  font-size: 18px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .filter-group {
    width: 100%;
  }

  .filter-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>


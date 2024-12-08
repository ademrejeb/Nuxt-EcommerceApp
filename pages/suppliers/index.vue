<template>
  <div class="card-container">
    <!-- Header Section -->
    <header class="header">
      <h2>Supplier Management</h2>
      <el-button type="primary" icon="el-icon-plus" @click="showAddModal = true">
        Add Supplier
      </el-button>
    </header>

    <!-- Search Bar -->
    <el-row class="search-bar-container">
      <el-col :span="24">
        <el-input
          v-model="search"
          placeholder="Search suppliers..."
          clearable
          prefix-icon="el-icon-search"
          class="search-bar"
        ></el-input>
      </el-col>
    </el-row>

    <!-- Supplier Cards -->
    <el-row :gutter="20" class="card-grid">
      <el-col
        :span="8"
        v-for="supplier in filteredSuppliers"
        :key="supplier._id || supplier.id"
      >
        <div class="supplier-card">
          <!-- Header Section -->
          <div class="card-header">
            <img
              :src="supplier.logo || 'https://via.placeholder.com/60'"
              alt="Logo"
              class="supplier-logo"
            />
            <div class="supplier-info">
              <h3 class="supplier-name">{{ supplier.name || 'No Name' }}</h3>
              <p class="supplier-contact">
                <i class="el-icon-phone"></i> {{ supplier.phone || 'No Phone' }}
              </p>
              <p class="supplier-contact">
                <i class="el-icon-message"></i> {{ supplier.email || 'No Email' }}
              </p>
            </div>
          </div>

          <!-- Body Section -->
          <div class="card-body">
            <p class="supplier-description">
              <i class="el-icon-document"></i>
              {{ supplier.description || 'No description available' }}
            </p>
            <p class="supplier-website">
              <i class="el-icon-link"></i>
              <a :href="supplier.website || '#'" target="_blank">
                {{ supplier.website || 'No website provided' }}
              </a>
            </p>
          </div>

          <!-- Footer Section -->
          <div class="card-footer">
           
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="openEditModal(supplier)"
              size="mini"
            >
              Edit
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteSupplier(supplier.external_id)"
              size="mini"
            >
              Delete
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- Add Supplier Modal -->
    <el-dialog
      title="Add Supplier"
      :visible.sync="showAddModal"
      width="500px"
      @close="resetNewSupplier"
    >
      <el-form :model="newSupplier" label-width="120px">
        <el-form-item label="Name" :rules="{ required: true }">
          <el-input v-model="newSupplier.name" />
        </el-form-item>
        <el-form-item label="Email" :rules="{ required: true }">
          <el-input v-model="newSupplier.email" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="newSupplier.phone" />
        </el-form-item>
        <el-form-item label="logo Image">
              <el-upload
                action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
                list-type="picture-card"
                :on-success="handleCoverUpload"
                :auto-upload="true"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
        <el-form-item label="Speciality">
          <el-input v-model="newSupplier.speciality" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="newSupplier.description" />
        </el-form-item>
        <el-form-item label="Website">
          <el-input v-model="newSupplier.website" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddModal = false">Cancel</el-button>
        <el-button type="primary" @click="addNewSupplier">Save</el-button>
      </template>
    </el-dialog>

    <!-- Edit Supplier Modal -->
    <el-dialog
      title="Edit Supplier"
      :visible.sync="showEditModal"
      width="500px"
      @close="resetCurrentSupplier"
    >
      <el-form :model="currentSupplier" label-width="120px">
        <el-form-item label="Name" :rules="{ required: true }">
          <el-input v-model="currentSupplier.name" />
        </el-form-item>
        <el-form-item label="Email" :rules="{ required: true }">
          <el-input v-model="currentSupplier.email" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="currentSupplier.phone" />
        </el-form-item>
        <el-form-item label="logo Image">
              <el-upload
                action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
                list-type="picture-card"
                :on-success="handleCoverUpload2"
                :auto-upload="true"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
        <el-form-item label="Speciality">
          <el-input v-model="currentSupplier.speciality" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="currentSupplier.description" />
        </el-form-item>
        <el-form-item label="Website">
          <el-input v-model="currentSupplier.website" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditModal = false">Cancel</el-button>
        <el-button type="primary" @click="saveUpdatedSupplier">Save</el-button>
      </template>
    </el-dialog>

    <!-- Pagination -->
    <el-row>
      <el-col :span="24" class="pagination-container">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="suppliersCount"
          @current-change="handlePageChange"
          layout="prev, pager, next"
        />
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      pageSize: 6,
      showAddModal: false,
      showEditModal: false,
      showDetailsModal: false,
      newSupplier: {
        name: "",
        email: "",
        phone: "",
        logo: "",
        speciality: "",
        description: "",
        website: "",
      },
      currentSupplier: {},
    };
  },
  computed: {
    ...mapState("supplier", {
      suppliers: (state) => state.suppliers,
      suppliersCount: (state) => state.suppliersCount,
    }),
    filteredSuppliers() {
      return this.suppliers.filter(
        (supplier) =>
          !this.search ||
          supplier.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions("supplier", [
      "fetchSuppliers",
      "deleteSupplierAction",
      "addSupplier",
      "updateSupplier",
    ]),

    handleCoverUpload(response) {
    const coverUrl = response.url || response.imageURL;
    if (coverUrl) {
      this.newSupplier.logo = coverUrl;
    } else {
      console.error("Cover image upload failed");
    }
  },
  handleCoverUpload2(response) {
    const coverUrl = response.url || response.imageURL;
    if (coverUrl) {
      this.currentSupplier.logo = coverUrl;
    } else {
      console.error("Cover image upload failed");
    }
  },
    handlePageChange(page) {
      this.currentPage = page;
    },
    async addNewSupplier() {
      if (!this.newSupplier.name || !this.newSupplier.email) {
        this.$message.error("Name and email are required");
        return;
      }
      try {
        await this.addSupplier(this.newSupplier);
        this.$message.success("Supplier added successfully");
        this.showAddModal = false;
        this.resetNewSupplier();
        await this.fetchSuppliers();
      } catch (error) {
        this.$message.error("Failed to add supplier");
        console.error(error);
      }
    },
    resetNewSupplier() {
      this.newSupplier = {
        name: "",
        email: "",
        phone: "",
        logo: "",
        speciality: "",
        description: "",
        website: "",
      };
    },
    openEditModal(supplier) {
      this.currentSupplier = { ...supplier };
      this.showEditModal = true;
    },
    resetCurrentSupplier() {
      this.currentSupplier = {};
      this.showEditModal = false;
    },
    viewDetails(supplier) {
      this.currentSupplier = { ...supplier };
      this.showDetailsModal = true;
    },
    async saveUpdatedSupplier() {
      try {
        await this.updateSupplier({
          supplierId: this.currentSupplier.external_id,
          supplierData: this.currentSupplier,
        });
        this.$message.success("Supplier updated successfully");
        this.resetCurrentSupplier();
        await this.fetchSuppliers();
      } catch (error) {
        this.$message.error("Failed to update supplier");
        console.error(error);
      }
    },
    async deleteSupplier(supplierId) {
      try {
        await this.deleteSupplierAction(supplierId);
        this.$message.success("Supplier deleted successfully");
        await this.fetchSuppliers();
      } catch (error) {
        this.$message.error("Failed to delete supplier");
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchSuppliers();
  },
};
</script>



<style lang="scss" scoped>
/* General Container */
.card-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Header Section */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.header .el-button {
  font-weight: 600;
}

/* Search Bar */
.search-bar-container {
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  border-radius: 24px;
  padding: 8px 16px;
}

/* Supplier Cards Grid */
.card-grid {
  margin-top: 20px;
}

.supplier-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 13px;
  height: 300px;
}

.supplier-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.supplier-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
}

.supplier-info {
  flex: 1;
}

.supplier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.supplier-contact {
  font-size: 14px;
  color: #777;
  margin: 4px 0;
}

.supplier-contact i {
  margin-right: 6px;
  color: #007bff;
}

/* Card Body */
.card-body {
  margin-top: 10px;
}

.supplier-description,
.supplier-website {
  font-size: 14px;
  color: #555;
  margin: 6px 0;
}

.supplier-website a {
  color: #007bff;
  text-decoration: none;
}

.supplier-website a:hover {
  text-decoration: underline;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.card-footer .el-button {
  flex: 1;
  margin: 0 4px;
}

/* Modals */
.el-dialog {
  .el-dialog__header {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .el-form-item {
    margin-bottom: 16px;
  }

  .el-button {
    font-weight: 600;
  }
}

/* Pagination */
.pagination-container {
  text-align: center;
  margin-top: 20px;
}

.el-pagination {
  display: inline-block;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header .el-button {
    margin-top: 10px;
  }

  .card-grid {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .supplier-card {
    padding: 16px;
    margin-bottom: 53px;
  }

  .card-footer {
    flex-direction: column;
  }

  .card-footer .el-button {
    margin: 8px 0;
  }
}
</style>

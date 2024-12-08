<template>
  <div class="collection-container">
    <!-- Header Section -->
    <header class="header">
      <h2>Collections</h2>
      <el-button type="primary" icon="el-icon-plus" class="add-btn" @click="showAddModal = true">
        Add Collection
      </el-button>
    </header>

    <!-- Search and Table -->
    <div class="content">
      <!-- Search Bar -->
      <el-input
        v-model="search"
        placeholder="Search collections..."
        clearable
        class="search-bar"
        prefix-icon="el-icon-search"
        @input="handleSearch"
      ></el-input>

      <!-- Collections Table -->
      <el-table :data="filteredCollections" class="collection-table" v-loading="isBusy" stripe >
        <el-table-column label="Name" prop="name" width="200"></el-table-column>
        <el-table-column label="Image" width="100">
          <template #default="scope">
            <img
              v-if="scope.row.cover"
              :src="scope.row.cover"
              alt="Cover Image"
              class="collection-image"
            />
          </template>
        </el-table-column>
        <el-table-column label="Category" prop="category"></el-table-column>
        <el-table-column label="Status" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">
              {{ scope.row.status ? 'Active' : 'Inactive' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="200">
          <template #default="scope">
            <el-button
              type="info"
              icon="el-icon-view"
              @click="openDetailsModal(scope.row)"
              circle
              title="View"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="openEditModal(scope.row)"
              circle
              title="Edit"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteCollection(scope.row.external_id)"
              circle
              title="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Pagination -->
    <el-pagination
  :current-page="currentPage"
  :page-size="pageSize"
  :total="collectionsCount"
  @current-change="handlePageChange"
  @size-change="handlePageSizeChange"
  layout="sizes, prev, pager, next"
  :page-sizes="[5, 10, 15, 20]"
  background
  class="pagination"
/>
    <!-- Add/Edit Collection Modals -->
    <el-dialog title="Add Collection" :visible.sync="showAddModal" width="500px">
      <el-form :model="newCollection" ref="addForm" label-width="120px">
        <el-form-item label="Name" prop="name" :rules="{ required: true, message: 'Name is required' }">
          <el-input v-model="newCollection.name" placeholder="Enter name" />
        </el-form-item>
        <el-form-item label="Cover Image">
          <el-upload
            action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
            list-type="picture-card"
            :on-success="handleCoverUpload"
            :auto-upload="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      
        <el-form-item label="Description">
          <el-input type="textarea" v-model="newCollection.description" placeholder="Enter description" />
        </el-form-item>
    
       
        <el-form-item label="Category" prop="category">
          <el-select v-model="newCollection.Category" placeholder="Select Category">
            <el-option
              v-for="category in categoryOptions"
              :key="category.id"
              :label="category.name"
              :value="category.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="SEO Metadata">
          <el-input v-model="newCollection.seo_metadata.title" placeholder="SEO Title" />
          <el-input v-model="newCollection.seo_metadata.description" placeholder="SEO Description" />
          <el-input v-model="newCollection.seo_metadata.slug" placeholder="SEO Slug" />
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model="newCollection.status" />
        </el-form-item>
        <el-form-item label="Order">
          <el-input-number v-model="newCollection.order" :min="0" placeholder="Enter order" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetNewCollection">Cancel</el-button>
        <el-button type="primary" @click="addNewCollection">Add</el-button>
      </template>
    </el-dialog>

    <el-dialog title="Edit Collection" :visible.sync="showEditModal" width="500px">
      <el-form :model="currentCollection" ref="editForm" label-width="120px">
        <el-form-item label="Name" prop="name" :rules="{ required: true, message: 'Name is required' }">
          <el-input v-model="currentCollection.name" placeholder="Enter name" />
        </el-form-item>
        <el-form-item label="Cover Image">
          <el-upload
            action="https://wledi-ecommerce-catalog-api-b3fdac72d7cd.herokuapp.com/upload"
            list-type="picture-card"
            :on-success="handleCoverUpload2"
            :auto-upload="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="currentCollection.description" placeholder="Enter description" />
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select v-model="currentCollection.Category" placeholder="Select Category">
            <el-option
              v-for="category in categoryOptions"
              :key="category.id"
              :label="category.name"
              :value="category.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="SEO Metadata">
          <el-input v-model="currentCollection.seo_metadata.title" placeholder="SEO Title" />
          <el-input v-model="currentCollection.seo_metadata.description" placeholder="SEO Description" />
          <el-input v-model="currentCollection.seo_metadata.slug" placeholder="SEO Slug" />
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model="currentCollection.status" />
        </el-form-item>
        <el-form-item label="Order">
          <el-input-number v-model="currentCollection.order" :min="0" placeholder="Enter order" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetCurrentCollection">Cancel</el-button>
        <el-button type="primary" @click="saveUpdatedCollection">Save</el-button>
      </template>
    </el-dialog>
    <el-dialog title="Detail Collection" :visible.sync="showDetailsModal" width="500px">
  <div class="details-content">
    <el-descriptions border column="1">
      <el-descriptions-item label="Name">{{ currentCollection.name }}</el-descriptions-item>
      <el-descriptions-item label="Cover">
        <img v-if="currentCollection.cover" :src="currentCollection.cover" alt="Cover Image" class="detail-image" />
      </el-descriptions-item>
      <el-descriptions-item label="Description">{{ currentCollection.description }}</el-descriptions-item>
      <el-descriptions-item label="Category">{{ currentCollection.category }}</el-descriptions-item>

      <el-descriptions-item label="SEO Metadata">
        <p><strong>Title:</strong> {{ currentCollection.seo_metadata.title }}</p>
        <p><strong>Description:</strong> {{ currentCollection.seo_metadata.description }}</p>
        <p><strong>Slug:</strong> {{ currentCollection.seo_metadata.slug }}</p>
      </el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag :type="currentCollection.status ? 'success' : 'danger'">
          {{ currentCollection.status ? 'Active' : 'Inactive' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Order">{{ currentCollection.order }}</el-descriptions-item>
      <el-descriptions-item label="Created At">
        {{ new Date(currentCollection.created_at).toLocaleString() }}
      </el-descriptions-item>
      <el-descriptions-item label="Updated At">
        {{ new Date(currentCollection.updated_at).toLocaleString() }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <template #footer>
    <el-button @click="showDetailsModal = false">Close</el-button>
  </template>
</el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions,mapGetters  } from 'vuex';

export default {
  data() {
    return {
      categoryOptions: [ ],
      search: '',
      currentPage: 1,
      pageSize: 6,
      showAddModal: false,
      showEditModal: false,
      showDetailsModal: false,

      newCollection: {
        name: '',
        cover: '',
        description: '',
        Category: "",
        seller_id: '',
        parent_external_id: '',
        parent_collection_name: '',
        seo_metadata: { title: '', description: '', slug: '' },
        status: true,
        order: 0,
      },
      currentCollection: {
        name: '',
        cover: '',
        description: '',
        Category: "",
        seller_id: '',
        parent_external_id: '',
        parent_collection_name: '',
        seo_metadata: { title: '', description: '', slug: '' },
        status: true,
        order: 0,
      },
    };
  },
  computed: {
    ...mapGetters('category', ['ALL_CATEGORIES']),

    ...mapState('collection', {
      collections: (state) => state.collections,
      isBusy: (state) => state.isBusy,
      error: (state) => state.error,
      collectionsCount: (state) => state.collectionsCount,
      
    }),
    filteredCollections() {
    // Apply search filter
    return this.collections.filter((collection) =>
      collection.name.toLowerCase().includes(this.search.toLowerCase())
    );
  },
  paginatedCollections() {
    return this.collections;
  },
  

    collectionsCount() {
      return this.filteredCollections.length;
    },
  },
  methods: {
    ...mapActions('collection', [
      'fetchCollections',
      'deleteCollectionAction',
      'addCollection',
      'updateCollection',
    ]),

    ...mapActions('category', ['FETCH_CATEGORIES']),


  loadCategories() {
    if (this.ALL_CATEGORIES && this.ALL_CATEGORIES.length) {
      this.categoryOptions = this.ALL_CATEGORIES.map((category) => ({
        id: category.external_id || category.id, // Adjust according to API field naming
        name: category.name,
      }));
    } else {
      console.warn("No categories available to load.");
    }
  },

    handleCoverUpload(response) {
  try {
    // Adjust for the correct response key
    const coverUrl = response.url || response.imageURL; 
    if (coverUrl) {
      this.newCollection.cover = coverUrl; // Set cover image
      
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
handleCoverUpload2(response) {
  try {
    // Adjust for the correct response key
    const coverUrl = response.url || response.imageURL; 
    if (coverUrl) {
      this.currentCollection.cover = coverUrl; // Set cover image
      
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

  

  handlePageChange(page) {
      this.currentPage = page;
      this.fetchCollections({ page, size: this.pageSize });
    },
    handlePageSizeChange(size) {
  console.log("Page size changed to:", size);
  this.pageSize = size; // Update the page size
  this.currentPage = 1;
  this.fetchCollections({ page: this.currentPage, size: this.pageSize });
},

    async addNewCollection() {
      try {

        console.log("adasdadas",this.newCollection)
        await this.addCollection(this.newCollection);
        this.$message.success('Collection added successfully');
        this.resetNewCollection();
        this.fetchCollections();
        this.showAddModal = false;
      } catch (error) {
        this.$message.error('Failed to add collection');
      }
    },
    resetNewCollection() {
      this.newCollection = {
        name: '',
        cover: '',
        description: '',
        Category: "",
        seller_id: '',
        parent_external_id: '',
        parent_collection_name: '',
        seo_metadata: { title: '', description: '', slug: '' },
        status: true,
        order: 0,
      };
    },
    openEditModal(collection) {
      this.currentCollection = {
        ...collection,
        seo_metadata: collection.seo_metadata || { title: '', description: '', slug: '' },
      };
      this.showEditModal = true;
    },
    openDetailsModal(collection) {
      this.currentCollection = {
        ...collection,
        seo_metadata: collection.seo_metadata || { title: '', description: '', slug: '' },
      };
      this.showDetailsModal = true;
    },
    resetCurrentCollection() {
      this.currentCollection = {
        name: '',
        cover: '',
        description: '',
        Category: "",
        seller_id: '',
        parent_external_id: '',
        parent_collection_name: '',
        seo_metadata: { title: '', description: '', slug: '' },
        status: true,
        order: 0,
      };
      this.showEditModal = false;
    },
    async saveUpdatedCollection() {
      try {
        console.log("adasdadas",this.currentCollection)

        await this.updateCollection({
          collectionId: this.currentCollection.external_id,
          collectionData: this.currentCollection,
        });
        this.$message.success('Collection updated successfully');
        this.resetCurrentCollection();
        this.fetchCollections();
      } catch (error) {
        this.$message.error('Failed to update collection');
      }
    },
    async deleteCollection(collectionId) {
      try {
        await this.deleteCollectionAction(collectionId);
        this.$message.success('Collection deleted successfully');
        this.fetchCollections();
      } catch (error) {
        this.$message.error('Failed to delete collection');
      }
    },
    handleSearch() {
      this.fetchCollections({ page: this.currentPage, size: this.pageSize });
    },
  },
  mounted() {
  this.FETCH_CATEGORIES()
    .then(() => this.loadCategories())
    .catch((error) => console.error('Error fetching categories:', error));

  this.fetchCollections({ page: this.currentPage, size: this.pageSize });
},
};
</script>

<style scoped>
.collection-container {
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 1.6rem;
  font-weight: bold;
  color: #343a40;
}

.add-btn {
  font-size: 1rem;
  padding: 6px 12px;
}

/* Search Bar */
.search-bar {
  margin-bottom: 20px;
  width: 100%;
}

.search-bar input {
  height: 36px;
  font-size: 0.95rem;
  border-radius: 18px;
}

/* Table */
.collection-table {
  font-size: 0.95rem;
  line-height: 1.4;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.collection-table .el-table__header-wrapper {
  font-size: 0.9rem;
  font-weight: 500;
}

.collection-table .el-table__row {
  height: 40px;
  transition: background-color 0.2s ease;
}

.collection-table .el-table__row:hover {
  background-color: #f5f5f5;
}

.collection-image {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 5px;
}

/* Pagination */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.el-pagination {
  font-size: 0.9rem;
  background-color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Modal Footer */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
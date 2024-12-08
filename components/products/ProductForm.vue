<template>
  <el-dialog :title="isEdit ? 'Edit Product' : 'Add Product'" :visible.sync="showModal" width="80%">
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step title="Basic Info"></el-step>
      <el-step title="Media"></el-step>
      <el-step title="Pricing & Inventory"></el-step>
      <el-step title="Options & SEO"></el-step>
    </el-steps>

    <el-form :model="formData" :rules="rules" ref="formRef" label-width="150px" class="mt-3">
      <!-- Step 1: Basic Info -->
      <div v-if="activeStep === 0">
        <el-form-item label="Name" prop="name">
          <el-input v-model="formData.name" placeholder="Enter product name" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="formData.description" placeholder="Enter product description" />
        </el-form-item>
            <el-form-item label="Categories" prop="categories">
          <el-select v-model="formData.categories" multiple placeholder="Select Categories">
  <el-option
    v-for="category in categoryOptions"
    :key="category.id"
    :label="category.name"
    :value="category.id"
  />
          </el-select>
            </el-form-item>


        <el-form-item label="Collections" prop="collections">
          <el-select v-model="formData.collections" multiple placeholder="Select collection">
  <el-option
    v-for="collection in collectionOptions"
    :key="collection.id"
    :label="collection.name"
    :value="collection.id"
  />
</el-select>

        </el-form-item>
   

        
        <el-form-item label="Tags" prop="tags">
          <el-select v-model="formData.tags" multiple placeholder="Select Tags">
            <el-option v-for="tag in tagOptions" :key="tag" :label="tag" :value="tag" />
          </el-select>
        </el-form-item>
      </div>

      <!-- Step 2: Media -->
      <div v-if="activeStep === 1">
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

      <!-- Step 3: Pricing & Inventory -->
      <div v-if="activeStep === 2">
        <el-form-item label="Price" prop="price">
          <el-input-number v-model="formData.price" :min="0" placeholder="Enter product price" />
        </el-form-item>
        <el-form-item label="Price Before Discount" prop="price_before_discount">
          <el-input-number v-model="formData.price_before_discount" :min="0" />
        </el-form-item>
        <el-form-item label="Quantity" prop="quantity">
          <el-input-number v-model="formData.quantity" :min="0" placeholder="Enter quantity" />
        </el-form-item>
        <el-form-item label="Availability" prop="availability">
          <el-switch v-model="formData.availability" active-text="Available" inactive-text="Unavailable" />
        </el-form-item>
      </div>

      <!-- Step 4: Options & SEO -->
      <div v-if="activeStep === 3">
        <el-form-item label="Options">
          <div v-for="(option, index) in formData.options" :key="index">
            <el-input v-model="option.name" placeholder="Option Name" class="mb-2" />
            <el-input v-model="option.description" placeholder="Option Description" class="mb-2" />
            <el-switch v-model="option.required" active-text="Required" inactive-text="Optional" />
            <el-button type="danger" size="mini" @click="removeOption(index)" class="mt-2">Remove Option</el-button>
          </div>
          <el-button type="primary" @click="addOption" class="mt-2">Add Option</el-button>
        </el-form-item>
        <el-form-item label="SEO Metadata">
          <el-input v-model="formData.seo_metadata.title" placeholder="SEO Title" />
          <el-input v-model="formData.seo_metadata.description" placeholder="SEO Description" />
          <el-input v-model="formData.seo_metadata.slug" placeholder="SEO Slug" />
        </el-form-item>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="prevStep" :disabled="activeStep === 0">Previous</el-button>
      <el-button v-if="activeStep < 3" @click="nextStep">Next</el-button>
      <el-button type="primary" v-if="activeStep === 3" @click="submitForm">
        {{ isEdit ? "Update" : "Add" }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  
  props: {
    showModal: { type: Boolean, required: true },
    isEdit: { type: Boolean, default: false },
    productData: {
      type: Object,
      default: () => ({
        collections: [], // Options for the dropdown
        name: "",
        description: "",
        categories: [],
        collections: [],

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
      }),
    },
  },
  data() {
    return {
      activeStep: 0,
      formData: JSON.parse(JSON.stringify(this.productData)),
      coverFileList: [],
      picturesFileList: [],
      videosFileList: [],
      tagOptions: ["Electronics", "Fashion", "Home"],
      categoryOptions: [ ],
      collectionOptions: [], 
      rules: {
        name: [{ required: true, message: "Please enter product name", trigger: "blur" }],
        price: [{ required: true, type: "number", message: "Enter a valid price", trigger: "blur" }],
        categories: [{ required: true, message: "Select at least one category", trigger: "change" }],
      },
    };
  },

  computed: {
    ...mapGetters('category', ['ALL_CATEGORIES']),
    ...mapGetters('collection', ['ALL_COLLECTIONS']),

  },
  methods: {
    ...mapActions('category', ['FETCH_CATEGORIES']),
    ...mapActions('collection', ['fetchCollections']),
    loadCollections() {
    if (this.ALL_COLLECTIONS && this.ALL_COLLECTIONS.length) {
      this.collectionOptions = this.ALL_COLLECTIONS.map((collection) => ({
        id: collection.external_id || collection.id, // Adjust based on your API field naming
        name: collection.name,
      }));
    } else {
      console.warn("No collections available to load.");
    }
  },

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
    validateImage(file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        this.$message.error("Only image files are allowed!");
      }
      return isImage;
    },
    validateVideo(file) {
      const isVideo = file.type.startsWith("video/");
      if (!isVideo) {
        this.$message.error("Only video files are allowed!");
      }
      return isVideo;
    },
    handleCoverUpload(response) {
  try {
    // Adjust for the correct response key
    const coverUrl = response.url || response.imageURL; 
    if (coverUrl) {
      this.formData.cover = coverUrl; // Set cover image
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
      this.formData.pictures.push(imageUrl); // Add to pictures array
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
        this.formData.videos.push(response.url);
        this.videosFileList.push({ name: response.name, url: response.url });
        console.log("Video uploaded:", response);
      } else {
        console.error("Video upload failed:", response);
      }
    },
    nextStep() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.activeStep++;
        }
      });
    },
    prevStep() {
      this.activeStep--;
    },
    addOption() {
      this.formData.options.push({ name: "", description: "", required: false });
    },
    removeOption(index) {
      this.formData.options.splice(index, 1);
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          console.log("Submitting form data:", this.formData);
          this.$emit("submit", this.formData);
        }
      });
    },
  },
  mounted() {
    this.fetchCollections()
    .then(() => {
      this.loadCollections();
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
    });
  this.FETCH_CATEGORIES().then(() => {
    this.loadCategories();
  }).catch((error) => {
    console.error("Error fetching categories:", error);
  });
},

  watch: {
    productData: {
      deep: true,
      handler(newValue) {
        this.formData = JSON.parse(JSON.stringify(newValue));
      },
    },
  },
};
</script>

<style scoped>
/* Modal Form */
.el-dialog {
  border-radius: 10px;
  overflow: hidden;
}

.el-dialog__header {
  background-color: #007bff;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.el-dialog__body {
  padding: 20px;
  background-color: #f9f9f9;
}

.el-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Form Styling */
.el-form {
  margin: 0 auto;
  max-width: 600px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input,
.el-input-number {
  width: 100%;
}

.el-button {
  border-radius: 8px;
}

.el-button--primary {
  background-color: #007bff;
  color: #fff;
}

.el-button--primary:hover {
  background-color: #0056b3;
}
</style>

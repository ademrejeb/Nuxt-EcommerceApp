<template>
  <div class="modal d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEdit ? 'Edit Category' : 'Add Category' }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <!-- Use el-form to wrap el-form-item -->
          <el-form :model="form" ref="categoryForm" label-width="120px">
            <el-form-item label="Name" prop="name">
              <input
                v-model="form.name"
                type="text"
                class="form-control"
                id="name"
                required
              />
            </el-form-item>

            <el-form-item label="Language" prop="language">
              <input
                v-model="form.language"
                type="text"
                class="form-control"
                id="language"
              />
            </el-form-item>

            <el-form-item label="Category" prop="category">
              <input
                v-model="form.category"
                type="text"
                class="form-control"
                id="category"
              />
            </el-form-item>

            <el-form-item label="Description" prop="description">
              <textarea
                v-model="form.description"
                class="form-control"
                id="description"
                rows="3"
              ></textarea>
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

            <el-form-item label="Background Color" prop="background_color">
              <input
                v-model="form.background_color"
                type="color"
                class="form-control"
                id="background_color"
              />
            </el-form-item>

            <el-form-item label="Foreground Color" prop="foreground_color">
              <input
                v-model="form.foreground_color"
                type="color"
                class="form-control"
                id="foreground_color"
              />
            </el-form-item>

            <el-form-item label="Order" prop="order">
              <input
                v-model="form.order"
                type="number"
                class="form-control"
                id="order"
              />
            </el-form-item>

            <el-form-item label="Active" prop="status">
              <input
                v-model="form.status"
                type="checkbox"
                class="form-check-input"
                id="status"
              />
              <label class="form-check-label" for="status">Active</label>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveCategory"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddEditCategoryModal",
  props: {
    category: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      form: this.category
        ? { ...this.category }
        : {
            name: "",
            language: "",
            category: "",
            description: "",
            cover: "",
            background_color: "#FFFFFF",
            foreground_color: "#000000",
            order: 0,
            status: true,
          },
      rules: {
        name: [{ required: true, message: "Name is required", trigger: "blur" }],
        category: [
          { required: true, message: "Category is required", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
  handleCoverUpload(response) {
    const coverUrl = response.url || response.imageURL;
    if (coverUrl) {
      this.form.cover = coverUrl;
    } else {
      console.error("Cover image upload failed");
    }
  },
  saveCategory() {
    this.$refs.categoryForm.validate((valid) => {
      if (valid) {
        const staticSellerId = "static-seller-id-123"; // Set your static seller ID here
        const payload = this.isEdit
          ? {
              product_category: {
                seller_id: staticSellerId,
                name: this.form.name,
                language: this.form.language,
                category: this.form.category,
                description: this.form.description,
                cover: this.form.cover,
                background_color: this.form.background_color,
                foreground_color: this.form.foreground_color,
                order: parseInt(this.form.order, 10), // Ensure 'order' is an integer
                status: this.form.status,
              },
              updateMask: [
                "seller_id",
                "name",
                "language",
                "category",
                "description",
                "cover",
                "background_color",
                "foreground_color",
                "order",
                "status",
              ],
            }
          : {
              seller_id: staticSellerId,
              name: this.form.name,
              language: this.form.language,
              category: this.form.category,
              description: this.form.description,
              cover: this.form.cover,
              background_color: this.form.background_color,
              foreground_color: this.form.foreground_color,
              order: parseInt(this.form.order, 10), // Ensure 'order' is an integer
              status: this.form.status,
            };

        console.log("Payload Sent to API:", payload); // Log the payload for debugging
        this.$emit("save", { isEdit: this.isEdit, category: payload });
      } else {
        console.error("Validation failed");
      }
    });
  },
},

};

</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  max-width: 600px;
}
</style>

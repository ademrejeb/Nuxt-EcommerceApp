<template>
  <div >
    <el-dialog title="Nouveau Message">
      <el-form class="demo-ruleForm" :rules="rules">
        <el-form-item label="Objet" prop="objet" required>
          <el-select v-model="form.objet" placeholder="Choisissez un objet" style="width: 100%;">
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Contenu" prop="content" required>
          <el-input v-model="form.content" type="textarea" placeholder="Contenu"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="resetForm" plain>
            <i class="el-icon-close"></i> Reset
          </el-button>
          <el-button type="success" @click="submitForm">
            <i class="el-icon-check"></i> Envoyer le message
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-menu mode="horizontal" :style="{ lineHeight: '64px' }">
      <h1>
        <img class="logo" :src="logo" alt="Logo" />
      </h1>
      <el-tag type="info" style="float: left; margin-top: 14px;">Total Abonnement</el-tag>
      <template >
        <el-submenu index="4" style="float: right;">
          <template #title>
            <i class="el-icon-user"></i>
            <span>mohamed guinoubi </span>
          </template>
          <el-menu-item>
            <i class="el-icon-box" style="color: #909399;"></i> Abonnements
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-paperclip" style="color: #909399;"></i> Facturation
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-s-operation" style="color: #909399;"></i> Préférences
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-tickets" style="color: #909399;"></i> Journal des événements
          </el-menu-item>
          <el-menu-item @click="logout">
            <i class="el-icon-switch-button" style="color: #909399;"></i> Se déconnecter
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>


<script>
export default {
  data() {
    return {
      logo:  "/med.jpg", // Replace with your static logo path
      options: [
        { value: "Réclamation", label: "Réclamation" },
        { value: "Problème technique", label: "Problème technique" },
        { value: "Proposition", label: "Proposition" },
        { value: "Autre demande", label: "Autre demande" },
      ],
      form: {
        objet: "",
        content: "",
      },
      rules: {
        objet: [
          { required: true, message: "Veuillez saisir un Objet", trigger: "change" },
        ],
        content: [
          { required: true, message: "Veuillez saisir une description", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.form.objet = "";
      this.form.content = "";
    },
    submitForm() {
      // Handle form submission logic
      console.log("Form submitted:", this.form);
    },
    logout() {
      // Add logout logic
      console.log("User logged out");
    },
  },
};
</script>


<style lang="scss" scoped>
.logo {
  height: 40px;
  margin-top: 12px;
}

.el-menu {
  background-color: #fff;
}

.el-tag {
  margin-left: 16px;
}
</style>

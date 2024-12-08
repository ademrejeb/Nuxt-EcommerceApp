<template>
  <el-row class="sidebar-menu">
    <el-col :span="24">
      <el-menu
        class="sidebar-menu"
        style="background: transparent"
        text-color="#fff"
        active-text-color="#fff"
        router
      >
        <div class="text-align-center" style="margin: 2rem 0 1.5rem 0;">
          <div class="rounded-avatar-container">
            <img src="/med.jpg" alt="User Avatar" />
          </div>
          <div style="width: 100%; text-align: center;">
            <span
              style="color: rgb(255, 255, 255); font-size: 1.5rem; font-weight: 600; font-family: 'Comfortaa', cursive;"
            >
              Mohamed Guinoubi
            </span>
            <br />
            <small style="color: rgb(255, 255, 255); font-family: 'Comfortaa', cursive;">
              lbl
            </small>
            <small style="color: rgb(255, 255, 255); font-family: 'Comfortaa', cursive;">
              |&nbsp;category
            </small>
            <br />
            <nuxt-link
              to="/profil"
              style="font-weight: normal; color: #55a8fe; text-decoration: none;"
            >
              <span class="element">Modifier mon profil </span>
            </nuxt-link>
          </div>
        </div>

        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span class="element">Tableau de bord</span>
        </el-menu-item>

        <el-menu-item-group title="PAGES">
          <el-menu-item index="/category">
            <i class="el-icon-folder"></i>
            <span class="element">Category</span>
          </el-menu-item>
          <el-menu-item index="/collections">
            <i class="el-icon-tickets"></i>
            <span class="element">Collections</span>
          </el-menu-item>
          <el-menu-item index="/inventory">
            <i class="el-icon-s-management"></i>
            <span class="element">Inventory</span>
          </el-menu-item>
          <el-menu-item index="/login">
            <i class="el-icon-user"></i>
            <span class="element">Login</span>
          </el-menu-item>
          <el-menu-item index="/packages">
            <i class="el-icon-present"></i>
            <span class="element">Packages</span>
          </el-menu-item>
          <el-menu-item index="/products">
            <i class="el-icon-box"></i>
            <span class="element">Products</span>
          </el-menu-item>
          <el-menu-item index="/suppliers">
            <i class="el-icon-truck"></i>
            <span class="element">Suppliers</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item index="logout">
          <i class="el-icon-switch-button"></i>
          <span class="element">Se déconnecter</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SidebarMenu",
};
</script>


<style lang="scss">
 .element {
    font-weight: 600 !important;
    font-size: 0.9rem !important;
 }
  .sidebar-menu {
    background: #24292f !important;
    height: 100%;
    // opacity: 0.9;
  }
  .rounded-avatar-container {
    font-size: 28px;
    color: #8c939d;
    line-height: 80px;
    text-align: center;
    cursor: pointer;

    img {
      border-radius: 50%;
      box-shadow: 0 2px 12px 0 #24292f;
      width: 100px;
      height: 100px;
    }
  }

  .el-menu-item,
  .el-menu-item .is-active {
    span {
      font-weight: 100;
      size: 10px;
      font-size: 1.2rem;
      line-height: 1.5;
      color: #fff;
      margin-left: 1rem;
      // font-family: 'Comfortaa', cursive;
    }

    i {
      color: #fff;
    }
  }
  .el-menu-item .is-active {
    background-color: #7100ff !important;
    color: #fff !important;
  }
  .el-menu-item:hover {
    background-color: #7100ff !important;
    color: #fff !important;
  }
  .el-menu-item:focus {
    background-color: #7100ff !important;
    color: #fff !important;
  }
  .el-menu-item:active {
    background-color: #7100ff !important;
    color: #fff !important;
  }
  .el-badge__content {
    border: none !important;
  }
</style>

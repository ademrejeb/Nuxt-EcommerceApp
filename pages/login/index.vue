<template>
  <div class="home">
    <h1>Welcome to Wledi-Ordre</h1>
    <ul class="page-links">
      <li><router-link to="/category">Category</router-link></li>
      <li><router-link to="/collections">Collections</router-link></li>
      <li><router-link to="/inventory">Inventory</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/packages">Packages</router-link></li>
      <li><router-link to="/products">Products</router-link></li>
      <li><router-link to="/suppliers">Suppliers</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: "default",
};
</script>

  
  <style>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  
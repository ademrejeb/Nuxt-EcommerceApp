<template>
  <div class="page-container-default">
    <template >
      <el-container>
        <el-aside width="300px" class="aside-sor">
          <sidebar></sidebar>
        </el-aside>
        <el-main class="main-sor">
          <navbar></navbar>
          <el-container class="body">
            <nuxt />
          </el-container>
        </el-main>
      </el-container>
      <el-footer>
        <p class="footer__with-sidebar">Wledi Pro - Audasoft Technology ©2023</p>
      </el-footer>
    </template>

  </div>
</template>

<script>
import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'

export default {
  components: { Navbar, Sidebar }
}
</script>

<style lang="scss">
.page-container-default {
  padding: 0;
  margin: 0 auto;
  background: #f7f7f7;
}

.aside-sor {
  height: 100%;
  background-size: cover;
  background-position: center top;
  opacity: 1;
  position: fixed;
}

.main-sor {
  padding: 0 0 20px 0;
  margin-left: 300px;
}

.footer {
  &__with-sidebar {
    color: #526488;
    word-spacing: 1px;
    padding-top: 15px;
    text-align: center;
    font-size: 10px;
    font-weight: 200;
    margin-left: 350px;
  }

  color: #526488;
  word-spacing: 1px;
  padding-top: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: 200;
}

.body {
  margin-bottom: 1rem;
  padding: 2rem 3rem;
  min-height: 75vh;
  font-family: 'Comfortaa', cursive;
}

html {
  font-family: 'Comfortaa', cursive;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
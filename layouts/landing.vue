<template>
  <div class="page-container">
    <el-container class="body-landing">
        <el-aside width="500px" class="aside-landing">
          <header class="header-landing-sidebar">
            <img src="https://www.wledi.com/_nuxt/img/9e9c134.png" />
            <br/><br/><br/>
            <h1 style="font-size: 30px;line-height: 35px;  font-family: 'Source Sans Pro', sans-serif;color: #fff;">Digitalisez votre établissement<br />Scolaire.</h1>
            <br/><br/><br/>
            <ul>
              <li style="font-size:1.2rem;margin-bottom:1rem;">Scolarité</li>
              <li style="font-size:1.2rem;margin-bottom:1rem;">Comptabilité</li>
              <li style="font-size:1.2rem;margin-bottom:1rem;">Marketing</li>
              <li style="font-size:1.2rem;margin-bottom:1rem;">Ressource Humaine</li>
            </ul>
          </header>
          <img class="landing-cover" src="https://www.wledi.com/_nuxt/img/96c4793.svg" />
        </el-aside>
        <el-main class="main-landing">
          <br/>
          <a class="login-form-forgot" target="_blanck" style="float:right;" href="https://www.wledi.com/inscription">
            <small style="margin-right:2rem;color:black;">Créer mon compte pro ?</small>
          </a>
          <nuxt />
        </el-main>
    </el-container>
    <el-footer>
      <p class="footer"><small>Wledi Pro - Audasoft Technology  ©2023</small>&nbsp;<a style="color:#fff;" href="http://audasoft.co">En Savoir Plus ? </a></p>
    </el-footer>
  </div>
</template>

<script>
import Navbar from '../components/navigation/Navbar'

export default {
  components: { Navbar },
  methods: {
    goToSignupPro() {
      window.location = 'https://www.wledi.com/inscription';
    }
  }
}
</script>

<style lang="scss">
.header-landing-sidebar {
  padding: 64px 64px 30px;
  img {
    width: 70px;
    margin-bottom: 1rem;
  }
}
.landing-cover {
  width: 360px;
  text-align: center;
  margin-top: 150px;
  margin-left: 60px;
}
.features {
  margin-left: 0;
  list-style: square;
  font-family: 'Source Sans Pro', sans-serif;
  li {
    padding-left: 0rem;
  }
}
.page-container {
  padding: 0;
  margin: 0 auto;
  height: 100vh;
  /* background: rgb(219,20,227);
  background: linear-gradient(150deg, rgba(219,20,227,1) 12%, rgba(94,114,228,1) 100%); 
  background: rgb(105,20,227);
  background: linear-gradient(150deg, rgba(105,20,227,1) 0%, rgba(192,94,228,1) 100%);
  background: rgb(20,144,227); */
  // background: linear-gradient(150deg, rgba(20,144,227,1) 0%, rgba(228,94,215,1) 100%);
}

.aside-landing {
  height: 100%;
  background-size: cover;
  background-position: center top;
  opacity: 1;
  position: fixed;
  width: 500px;
  background: #24292f;
  color: #fff;
}

.main-landing {
  padding: 0 0 20px 0;
  margin-left: 500px;
}
.landing-header{
  color: #444;
  width: 100%;
  text-align: center;
  position: absolute;
  padding-top: 6rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 40px;
}

.footer {
  color: #fff;
  word-spacing: 1px;
  padding-top: 65px;
  text-align: center;
  font-size: 14px;
  font-weight: 200;
  bottom: 0;
  font-family: 'Comfortaa', cursive;
}
.login-form-forgot {
  font-size: 15px;
  color: black;
  text-decoration: none;
}
.login-form-forgot:hover {
  text-decoration: underline;
}
.main-container {
  margin: 1rem auto;
  max-width: 1140px;
}

.body-landing {
  padding-top: 0rem;
  margin-bottom: 0rem;
  padding-bottom: 0rem;
  min-height: 75vh;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
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

.landing-pro-title {
  text-align: left;
  padding-left: 4rem;
  color: #fff;
font-family: 'Source Sans Pro', sans-serif;
  padding-bottom: 2rem;
}
</style>
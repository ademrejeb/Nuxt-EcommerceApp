<template>
  <h1>Welcome to Wledi-Ordre</h1>

</template>

<script>

export default {

    layout : "default",
  

methods: {
goToAvis() {
  this.$router.push('/avis'); // Redirect to the 'avis' page
},
},
};
</script>

<style>
.home {
text-align: center;
margin-top: 50px;
}
</style>

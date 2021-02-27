

<script>

import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer,
  }
}
</script>


<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>

    <Footer />
  </div>
  
</template>

<style src="./assets/styles/Nav.css">
</style>

<template>
  <div id="app">
    <div id="nav">
      <Header />
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />

    <Footer />
  </div>
</template>


<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>


<style src="./assets/styles/Nav.css">
</style>

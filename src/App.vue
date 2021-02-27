

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
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
    <router-view/>

    <Footer />
  </div>
  
</template>

<style>
/* unused css garbage */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  padding-right: 20px;
}

#nav a:last-of-type {
  padding-right: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

<style src="./assets/styles/Nav.css"></style>

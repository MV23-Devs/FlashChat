
<template>
  <div id="app">
    <div id="nav">
     
      <router-link to="/"> <span class="NavButtons">Home </span></router-link>
      <router-link to="/login"> <span class="NavButtons"> Login </span></router-link>
      <router-link to="/collection"> <span class="NavButtons"> Collection </span></router-link>
      <Header></Header>
    </div>
      

    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>

import Header from "./components/Header"
import Footer from "./components/Footer"
import { firebase } from '@firebase/app'
import "firebase/auth"
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        // var photoURL = user.photoURL;
        // var uid = user.uid;

        console.log(email)
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  },
};
</script>

<style>
/* unused css garbage */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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


#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

<style src="./assets/styles/Nav.css"  ></style>

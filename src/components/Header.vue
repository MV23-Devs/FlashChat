<template>
  <div id="header">
    <div class="logged">
      <span v-if="loggedIn">Logged in as {{ this.user.email }}  <button @click="signOut">Sign Out</button></span>
      <span v-else>You are not logged in <button @click="signIn">Sign In</button></span>
    </div>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth";
export default {
  name: "Header",
  mounted() {
    this.setupFirebase();
  },
  data() {
    return {
      loggedIn: false,
      user: null,
    };
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
          this.user = user;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          this.user = null;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    async signOut() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
    signIn() {
      this.$router.push("/login");
    }
  },
};
</script>

<style src='../assets/styles/Header.css'>
</style>
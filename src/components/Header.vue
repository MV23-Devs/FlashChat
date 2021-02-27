<template>
  <div>
    <div class="logged">
      
      <span v-if="loggedIn">Logged in as {{this.user.email}}</span>
      <span v-else
        >no

      </span>
        <button @click="signOut">Sign Out</button>
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
      user: null
    };
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style src='../assets/styles/DisplayCard.css'>
</style>
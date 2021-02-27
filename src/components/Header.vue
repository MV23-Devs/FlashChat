<template>
  <div>
    <div class="logged">
      Logged in
      <span v-if="loggedIn">yes.</span>
      <span v-else>no </span>
        <button @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { firebase } from '@firebase/app'
import "firebase/auth"
export default {
  mounted() {
    this.setupFirebase();
  },
  data() {
    return {
      // loggedIn: false
    }
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
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
    }
  },
  name: "DisplayCard",
  props: {
    clue: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
};
</script>

<style src='../assets/styles/DisplayCard.css'>
</style>
<template>
  <div class="register">
    <div v-if="error" class="error">{{ error.message }}</div>
    <h1>Register</h1>
    <hr />

    <form @submit.prevent="pressed">
      <div class="email">
        <input type="email" v-model="email" placeholder="Email:" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="Password:" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  methods: {
    async pressed() {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        console.log(user);
        firebase.firestore().collection("accounts").doc(this.email).set({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
};
</script>

<style>
.error {
  color: red;
  font-size: 20px;
}
</style>
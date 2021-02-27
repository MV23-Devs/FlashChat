<template>
  <div class="login">
    <h1>Login</h1>
    <hr>
    <form @submit.prevent="pressed">
      <div class="email">
        <input id="email" class="inputField" type="email" v-model="email" placeholder="Email">
      </div>
      <div class="password">
            <input id="pass" class="inputField" type="password" v-model="password" placeholder="Password:">
        </div>
        <button id="submitBtn" type="submit">Login</button>
    </form>

    <span>Don't Have an Account? Click here to </span>
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
import { firebase } from '@firebase/app'
import "firebase/auth"
export default {
  data() {
    return {
      email: '',
      password: '',
      data: ''
    }
  },
  methods: {
    async pressed() {
      try {
        const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log(val)
        this.$router.push("/")
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
    .error {
        color: red;
        font-size: 20px;
    }
</style>

<style src="../assets/styles/Login.css"></style>

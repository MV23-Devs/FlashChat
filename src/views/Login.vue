<template>
  <div class="login">
    <h1>Login</h1>
    <hr>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" v-model="email" placeholder="Email">
      </div>
      <div class="password">
            <input type="password" v-model="password" placeholder="Password:">
        </div>
        <button type="submit">Register</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
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
      } catch (error) {
        console.log(error)
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

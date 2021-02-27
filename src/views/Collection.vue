<template>
  <div class="login">
    <h1>Collection</h1>
    <hr>
    
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

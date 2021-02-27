<template>
  <div id="app">
    <MainScreen :messages="messages" msg="Sup Hoes"/>
    <FlashcardForm />
  </div>
</template>

<script>
import MainScreen from './components/MainScreen.vue'
import FlashcardForm from './components/FlashcardForm.vue'

export default {
  name: 'App',
  components: {
    MainScreen,
    FlashcardForm
  },
  data() {
    return {
      messages: ["lol", "yeeyee", "haw", "shamone"]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

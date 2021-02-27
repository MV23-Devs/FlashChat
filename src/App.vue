<template>
  <div id="app">
    <MainScreen :messages="messages" msg="Sup Hoes"/>
    <FlashcardForm />
    <DisplayCard :clue="DisplayClue" :answer="DisplayAnswer"/>
  </div>
</template>

<script>
import MainScreen from './components/MainScreen.vue'
import FlashcardForm from './components/FlashcardForm.vue'
import DisplayCard from './components/DisplayCard.vue'

export default {
  name: 'App',
  components: {
    MainScreen,
    FlashcardForm,
    DisplayCard
  },
  data() {
    return {
      messages: ["lol", "yeeyee", "haw", "shamone"],
      DisplayClue: 'yeet',
      DisplayAnswer: 'yeet2',
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

<template>
  <div id="app">
    <br>
    <!-- <DisplayCard :clue="DisplayClue" :answer="DisplayAnswer"/> -->
    <!-- <VideoChat msg="Flash Call"/> -->
    <MainScreen/>
  </div>
</template>

<script>

// import DisplayCard from '../components/DisplayCard.vue'
//import VideoChat from '../components/VideoChat.vue'
import MainScreen from '../components/MainScreen.vue'

export default {
  name: 'App',
  components: {
    MainScreen,

    // DisplayCard,
    //VideoChat
  },
  data() {
    return {
      // messages: ["lol", "yeeyee", "haw", "shamone"],
      // DisplayClue: 'yeet',
      // DisplayAnswer: 'yeet2',
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
}
</style>
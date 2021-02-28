
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" msg="Flash Study" />
    <Flashcard />
    <Chat id="chat" />
    
  </div>
</template>


<script>
import VideoChat from "../components/VideoChat.vue";
import Flashcard from "../components/Flashcard.vue";
import Chat from "../components/Chat.vue";

export default {
  name: "App",
  components: {
    VideoChat,
    Flashcard,
    Chat,
  },
};
</script>

<style scoped>
#chat {
  display: inline;
  border: 1px solid black;
  float: right;
}
#vidChat {
  width: 100%;
}
</style>
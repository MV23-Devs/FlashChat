
<template> 
    <div id="VideoPage">
        <VideoChat msg="Flash Study"/>
        <Chat/>
        <Flashcard/>
    </div>

</template>


<script> 
    import VideoChat from '../components/VideoChat.vue'
    import Flashcard from '../components/Flashcard.vue'
    import Chat from '../components/Chat.vue'

    export default {
    name: 'App',
    components: {
        VideoChat,
        Flashcard,
        Chat
    }
    }    


</script>

<style scoped>

</style>
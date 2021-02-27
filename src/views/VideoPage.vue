
<template> 
    <div id="VideoPage">
        <VideoChat msg="Flash Study"/>
        <Flashcard/>
    </div>

</template>


<script> 
    import VideoChat from '../components/VideoChat.vue'
    import Flashcard from '../components/Flashcard.vue'

    export default {
    name: 'App',
    components: {
        VideoChat,
        Flashcard
    }
    }    


</script>

<style scoped>

</style>
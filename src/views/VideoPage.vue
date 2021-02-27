
<template> 
    <div id="VideoPage">
        <DisplayCard :clue="DisplayClue" :answer="DisplayAnswer"/>
        <VideoChat msg="Flash Study"/>
    </div>

</template>


<script> 
    import DisplayCard from '../components/DisplayCard.vue'
    import VideoChat from '../components/VideoChat.vue'

    export default {
    name: 'App',
    components: {
        DisplayCard,
        VideoChat
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

<style scoped>

</style>
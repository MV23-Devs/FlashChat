<template>
    <div id="main">
        <h1>FLASH CHAT MOTHAFUCKAS</h1>
        <button v-on:click="goToVideoPage" >Join a Meeting</button>
    </div>
</template>
 
<script>
    export default {
        name: 'MainScreen',
        props: {
            messages: {
                type: Array,
            },
        },
        methods: {
            goToVideoPage() {
                this.$router.push("/VideoPage")
            }
        }
        
    }
</script>

<style scoped>
</style>
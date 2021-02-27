<template>
    <div id="main">
        <h1>FLASH CHAT </h1>
        <v-btn elevation="24" outlined raised tile v-on:click="goToVideoPage" >Join a Meeting</v-btn>
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
button {
    margin: 5px;
    font-size: 30px;
    position: relative;
    padding: 20px;
    padding-left: 70px;
    padding-right: 70px;
    transition: padding 1s;
    outline: none;
}

button:hover {
    animation-fill-mode: forwards;
    padding-left: 170px;
    padding-right: 170px;
    transition: padding 1s;
}
</style>
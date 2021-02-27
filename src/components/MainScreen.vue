<template>
    <div id="main">
        <button>Join a Meeting</button>
    </div>
</template>
 
<script>
    export default {
        name: 'MainScreen',
        props: {
            messages: {
                type: Array,
            },
        }
    }
</script>

<style scoped>
</style>
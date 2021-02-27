<template>
    <div id="main">
        <h1> Main Screen </h1>
        <h2> Messages: </h2>
        <table>
            <tbody>
                <tr v-for="message in messages" :key="messages.indexOf(message)">
                    <td>{{ message }}</td>
                </tr>
            </tbody>
        </table>
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
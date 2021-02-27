<template>
    <div id="flashcardform">
        <form @submit.prevent="handleSubmit">
            <label>Clue</label>
            <input v-model="flashcard.clue" type="text" name="clue"/>
            <label> Answer </label>
            <input v-model="flashcard.answer" type="text" name="answer"/>
            <button>Add Flashcard</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'FlashcardForm',
        data() {
            return {
                flashcard: {
                    clue: "",
                    answer: "",
                }
            }
        },
        methods: {
            handleSubmit() {
                console.log("flashcard form submitted")

            }
        }
    }
</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }
</style>
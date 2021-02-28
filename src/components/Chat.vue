<template>
    <div>
        <h2>Guesses:</h2>
        <ul v-for="item in userInputs" :key="userInputs.indexOf(item)" style="list-style-type:none;"> 
            <li>{{ item }}</li>
        </ul>    
        <form @submit.prevent = "checkAnswer" id = 'answerForm'>
            <label>Enter Answer Here:</label>
            <input type="text" class="inputField" v-on:input="userInput = $event.target.value"/>
            <br>
            <button id="submitBtn">Check Answer!</button>
        </form>
    </div>
 
</template>


<style  src="../assets/styles/chat.css">

</style>

<script>
    import { firebase } from "@firebase/app";
    import "firebase/auth";

    export default {
        data() {
          return {
            userInputs: [],
            answer: "",
            userInput: "",
            userPoints: 0
          }
        },
        mounted() {
          firebase
          .firestore()
          .collection("accounts")
          .doc(firebase.auth().currentUser.email)
          .collection("collections")
          .doc("Test")
          .collection("cards")
          .doc("test2")
          .get()
          .then(doc => {
            console.log(doc.data());
            this.answer = doc.data().val;
            console.log(this.answer);
          })
        },

        methods: {
            inputRecords(input) {
                this.userInputs.push(input);
                console.log(this.userInputs);
            }, 
            checkAnswer() {
                firebase
                .firestore()
                .collection("accounts")
                .doc(firebase.auth().currentUser.email)
                .collection("collections")
                .doc("Test")
                .collection("cards")
                .doc("test2")
                .get()
                .then(doc => {
                    console.log(doc.data());
                    this.answer = doc.data().val;
                    console.log(this.answer);
                })
                console.log(this.userInput);
                console.log(this.answer);
                this.inputRecords(this.userInput);
                if (this.userInput === this.answer) {
                    this.inputRecords("YOU GOT THE ANSWER!");
                    this.addPoints(500);
                    console.log("That was correct!");
                }
            },
            //remember to reset points if router path goes back to root
            addPoints(pointsWon) {
                this.userPoints += pointsWon;
                firebase
                .firestore()
                .collection("accounts")
                .doc(firebase.auth().currentUser.email)
                .get()
                .then(doc => {
                    console.log("LITERALLY WIN POINTS LMAO")
                    console.log(doc.data());
                    pointsWon = pointsWon + doc.data().points;
                    console.log(doc.data().points);
                })
                firebase
                .firestore()
                .collection("accounts")
                .doc(firebase.auth().currentUser.email)
                .update({ points: pointsWon })
                .then(() => {
                    console.log("Firebase Points Updated Successfully: ")
                })
            }

            

            

        }
    }
</script>


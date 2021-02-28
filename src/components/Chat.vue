<template>
  <div>
    
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
      user: "",
      userInput: "",
      userPoints: 0,
      current: "",
      open: false,
    };
  },
  props: {
    collection: String,
    card: String,
  },
  mounted() {
    if (firebase.auth().currentUser) {
      firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .collection("collections")
        .doc("Test")
        .collection("cards")
        .doc("test2")
        .get()
        .then((doc) => {
          console.log(doc.data());
          this.answer = doc.data().val;
          console.log(this.answer);
        });
    }
  },

  methods: {
    inputRecords(input) {
      this.userInputs.push(input);
      console.log(this.userInputs);
    },
    checkAnswer() {
      console.log(this.$props.collection, this.$props.card);
      firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .collection("collections")
        .doc("Test")
        .collection("cards")
        .doc("test2")
        .get()
        .then((doc) => {
          console.log("Data: " + doc.data());
          this.answer = doc.data().val;
          console.log(this.answer);
        });
      console.log(this.userInput);
      console.log("Answer: " + this.answer);
      this.inputRecords(this.userInput);
      if (this.userInput === this.answer) {
        this.inputRecords("YOU GOT THE ANSWER!");
        this.addPoints(500);
        console.log("That was correct!");
      }
    },
    //remember to reset points if router path goes back to root
    addPoints(pointsWon) {
      let points = pointsWon;
      this.userPoints += pointsWon;
      firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((doc) => {
          console.log("LITERALLY WIN POINTS LMAO");
          console.log(doc.data());
          points = points + doc.data().points;
          console.log(doc.data().points);
        });
      firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .update({ points: points })
        .then(() => {
          console.log("Firebase Points Updated Successfully: ");
        });
    },

    updateTable() {
      firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((doc) => {
          this.userPoints = doc.data().points;
          this.user = doc.data().email;
        });
    },
  },
};
</script>


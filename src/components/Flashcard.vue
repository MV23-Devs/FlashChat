<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <h2 v-if="cardHidden">Term</h2>
      <h2 v-else>Answer</h2>
      <p v-if="cardHidden" class="display-1 text--primary">
        {{ this.cardname }}
      </p>
      <p v-else class="display-1 text--primary">{{ this.answer }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn v-on:click="flipCard" text color="deep-purple accent-4"
        >Flip</v-btn
      >
    </v-card-actions>
  </v-card>
</template>


<style src="../assets/styles/Flashcard.css">

</style>


 <script>
import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
  name: "Flashcard",
  data() {
    return {
      cardname: "",
      answer: "",
      cardHidden: true,
    };
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
      .then((doc) => {
        console.log(doc.data());
        this.cardname = doc.data().key;
        this.answer = doc.data().val;
        console.log(this.cardname, this.answer);
      });
  },

  methods: {
    nextCard() {},
    flipCard() {
      this.cardHidden = !this.cardHidden;
    },
  },
};
</script>
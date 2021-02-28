<template>
  <v-card id="card" class="mx-auto" max-width="344">
    <v-card-text>
      <h2 v-if="cardHidden">Term</h2>
      <h2 v-else>Answer</h2>
      <p v-if="cardHidden" class="display-1 text--primary">
        {{ this.cards }}
      </p>
      <p v-else class="display-1 text--primary">{{ this.cards }}</p>
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
      cards: new Map(),
      cardHidden: true,
    };
  },
  mounted() {
    this.pullCards();8
  },
  methods: {
    async pullCards() {
      const user = await firebase.auth().currentUser;
      if (user) {
        firebase
          .firestore()
          .collection("accounts")
          .doc(user.email)
          .collection("collections")
          .doc("Test")
          .collection("cards")
          .onSnapshot((ref) => {
            ref.docChanges().forEach((change) => {
              const {doc, type } = change;
              if (type === "added") {
                this.cards[doc.data().key] = doc.data().val;
              } else if (type === "modified") {
                console.log("modified");
              } else if (type === "removed") {
                console.log("removed");
              }
            });
            console.log("CARDS: ", this.cards)
          })
      }
    },

    nextCard() {},
    flipCard() {
      //document.getElementById("card").addClass("addedclass");
      this.cardHidden = !this.cardHidden;
    },
  },
};
</script>
<template>
  <v-card id="card" class="mx-auto" max-width="344">
    <v-card-text>
      <h2 v-if="cardHidden">Term</h2>
      <h2 v-else>Answer</h2>
      <p v-if="cardHidden" class="display-1 text--primary">
        {{ Object.keys(this.cards)[this.cardIndex] }}
      </p>
      <p v-else class="display-1 text--primary">
        {{ this.cards[Object.keys(this.cards)[this.cardIndex]] }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn v-on:click="flipCard" text color="deep-purple accent-4"
        >Flip</v-btn
      >
      <v-btn v-on:click="nextCard" text color="deep-purple accent-4"
        >Next</v-btn
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
      cardIndex: 0,
      cardHidden: true,
    };
  },
  mounted() {
    this.pullCards();
  },
  methods: {
    async pullCards() {
      firebase
        .firestore()
        .collection("sessions")
        .doc("Demo")
        .collection("cards")
        .onSnapshot((ref) => {
          ref.docChanges().forEach((change) => {
            const { doc, type } = change;
            if (type === "added") {
              console.log("Data: ", doc.data());
              this.cards[doc.data().key] = doc.data().val;
            } else if (type === "modified") {
              console.log("modified");
            } else if (type === "removed") {
              console.log("removed");
            }
          });
        });
      console.log("CARDS: ", this.cards);
    },

    nextCard() {
      this.cardIndex += 1;
      console.log(Object.keys(this.cards));
      if (this.cardIndex >= Object.keys(this.cards).length) {
        this.cardIndex = 0;
      }
      console.log("cardIndex: ", this.cardIndex);
      this.$store.commit("changeAnswer", this.cards[Object.keys(this.cards)[this.cardIndex]] );
    },
    flipCard() {
      //document.getElementById("card").addClass("addedclass");
      this.cardHidden = !this.cardHidden;
      console.log("FLIP CARDS: ", this.cards);
    },
  },
};
</script>
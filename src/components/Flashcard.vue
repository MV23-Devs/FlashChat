<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Card:</div>
      <p class="display-1 text--primary">
        {{this.cardname}}
      </p>
      <div class="text--primary">
        <p>{{ this.answer }}</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

 <script>
    import { firebase } from "@firebase/app";
    import "firebase/auth";

    export default {
        name: "Flashcard",
        data() {
          return {
            cardname: "",
            answer: ""
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
            this.cardname = doc.data().key;
            this.answer = doc.data().val;
            console.log(this.cardname, this.answer);
          })
        },

        methods: {
          nextCard() {




          }

          


        }

    }
 </script>
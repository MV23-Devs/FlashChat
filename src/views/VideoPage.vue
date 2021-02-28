
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" msg="Flash Study" />
    <div id="notVideo">
      <Flashcard class="stackedElement" />

      <h2>Guesses:</h2>
      <ul
        v-for="item in userInputs"
        :key="(Math.random() + 1).toString() + userInput.indexOf(item)"
        style="list-style-type: none"
      >
        <li>{{ item }}</li>
      </ul>
      <form @submit.prevent="checkAnswer" id="answerForm">
        <label>Enter Answer Here:</label>
        <input
          type="text"
          class="inputField"
          v-on:input="userInput = $event.target.value"
        />
        <br />
        <button id="submitBtn">Check Answer!</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Player points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ this.user }}</td>
            <td>{{ this.userPoints }}</td>
          </tr>
          <tr>
            <td>saarang.bondalapati@gmail.com</td>
            <td>500</td>
          </tr>
        </tbody>
      </table>

      <div id="VideoPageCustomArea" class="stackedElement">
        <h3>View Collection</h3>
        <select id="DropdownMenu" v-model="current" @change.prevent="opened">
          <option
            id="DropdownOptions"
            v-for="item in collections"
            :key="item.name"
          >
            {{ item.name }}
          </option>
        </select>

        <ul>
          <li v-for="card in cards" :key="card.key">
            {{ card.key }} | {{ card.val }}
          </li>
        </ul>

        <button id="shuffleBtn" @click="shuffle">Shuffle</button>
      </div>
    </div>
  </div>
</template>


<script>
import VideoChat from "../components/VideoChat.vue";
import Flashcard from "../components/Flashcard.vue";

import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
  name: "App",
  components: {
    VideoChat,
    Flashcard,
  },

  mounted() {
    this.load();

    // if (firebase.auth().currentUser) {
    //   firebase
    //     .firestore()
    //     .collection("accounts")
    //     .doc(firebase.auth().currentUser.email)
    //     .collection("collections")
    //     .doc("Test")
    //     .collection("cards")
    //     .doc("test2")
    //     .get()
    //     .then((doc) => {
    //       console.log(doc.data());
    //       this.answer = doc.data().val;
    //       console.log(this.answer);
    //     });
    // }
  },

  data() {
    return {
      collections: [],
      cards: [],
      key: "",
      val: "",
      name: "",
      current: "",
      ccurent: "",
      open: false,
      userInputs: [],
      answer: "",
      user: "",
      userInput: "",
      userPoints: 0,
    };
  },
  methods: {
    showNotVideo() {
      document.getElementById("notVideo").style.display = "inline-block";
    },
    shuffle() {
      console.log(this.cards);
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        this.ccurent = this.cards[0].name;
      }
    },
    opened() {
      this.open = true;
      this.load();
    },
    async load() {
      const user = await firebase.auth().currentUser.email;
      if (user) {
        console.log("test");
        if (this.open) {
          this.cards = [];
          firebase
            .firestore()
            .collection("accounts")
            .doc(firebase.auth().currentUser.email)
            .collection("collections")
            .doc(this.current)
            .collection("cards")
            .onSnapshot((ref) => {
              ref.docChanges().forEach((change) => {
                const { newIndex, oldIndex, doc, type } = change;
                if (type === "added") {
                  this.cards.push({ key: doc.data().key, val: doc.data().val });
                  console.log(this.cards);
                  console.log("test3");
                } else if (type === "modified") {
                  this.cards.splice(oldIndex, 1);
                  this.cards.splice(newIndex, 0, doc.data());
                } else if (type === "removed") {
                  this.cards.splice(oldIndex, 1);
                }
              });
            });
          this.shuffle();
        }
        this.collections = [];
        firebase
          .firestore()
          .collection("accounts")
          .doc(firebase.auth().currentUser.email)
          .collection("collections")
          .onSnapshot((ref) => {
            ref.docChanges().forEach((change) => {
              const { newIndex, oldIndex, doc, type } = change;
              if (type === "added") {
                this.collections.push(doc.data());
                console.log("test2");
                console.log("Collections: " + this.collections);
              } else if (type === "modified") {
                this.collections.splice(oldIndex, 1);
                this.collections.splice(newIndex, 0, doc.data());
              } else if (type === "removed") {
                this.collections.splice(oldIndex, 1);
              }
            });
          });
      }
    },
    inputRecords(input) {
      this.userInputs.push(input);
      console.log(this.userInputs);
    },
    checkAnswer() {
      console.log(this.current, this.ccurrent);
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
            console.log(doc.data())
          this.answer = doc.data();
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

<style scoped src="../assets/styles/VideoPage.css">
</style>
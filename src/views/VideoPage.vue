
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" msg="Flash Study" />

    <div id="chooseCollection">
      <h3>Choose Collection to Submit</h3>
      <select id="DropdownMenu" v-model="current" @change.prevent="opened">
        <option
          id="DropdownOptions"
          v-for="item in collections"
          :key="item.name"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <div id="notVideo">
      <!-- mute -->
      <v-btn id="muteButton" class="iconButtons" v-if="micOn" v-on:click="mute"
        ><img src="../assets/microphone.png" width="24" height="24"
      /></v-btn>
      <v-btn id="muteButton" class="iconButtons" v-else v-on:click="mute"
        ><img src="../assets/microphone-off.png" width="24" height="24"
      /></v-btn>
      <!-- video  -->
      <v-btn
        id="cameraButton"
        class="iconButtons"
        v-if="camOn"
        v-on:click="cameraFlip"
        ><img src="../assets/camera.png" width="24" height="24"
      /></v-btn>
      <v-btn
        id="cameraButton"
        class="iconButtons"
        v-else
        v-on:click="cameraFlip"
        ><img src="../assets/camera-off.png" width="24" height="24"
      /></v-btn>
      <h2>Current FlashCard</h2>
      <Flashcard class="stackedElement" />
      <hr id="spacedHr" />
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
      <table id="scoreTable">
        <thead>
          <tr>
            <th>Player name</th>
            <th>Player points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in players" :key="players.indexOf(item)">
            <td>{{ item.email }}</td>
            <td>{{ item.points }}</td>
          </tr>
        </tbody>
      </table>

      <ul>
        <li v-for="card in cards" :key="card.key">
          {{ card.key }} | {{ card.val }}
        </li>
      </ul>

      <button id="shuffleBtn" @click="shuffle">Shuffle</button>
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
      opponentPoints: 0,
      micOn: true,
      camOn: true,
      players: []
    };
  },
  methods: {
    mute() {
      console.log("Mute was called");
      // if (micOn) {
      //   localStreams.camera.stream.muteAudio();
      // } else {
      //   localStreams.camera.stream.unmuteAudio();
      // }
      this.micOn = !this.micOn;
    },
    cameraFlip() {
      console.log("cameraFlip was called");
      this.camOn = !this.camOn;
    },
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
      const user = await firebase.auth().currentUser;
      console.log(user);
      if (user) {
        if (user.email) {
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
                    firebase
                      .firestore()
                      .collection("sessions")
                      .doc("gummosucc")
                      .collection("cards")
                      .add({
                        key: doc.data().key,
                        val: doc.data().val,
                      });
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

          firebase
            .firestore()
            .collection("sessions")
            .doc("gummosucc")
            .collection("players")
            .onSnapshot((ref) => {
              ref.docChanges().forEach((change) => {
                const { newIndex, oldIndex, doc, type } = change;
                if (type === "added") {
                  this.players.push({
                    email: doc.data().email,
                    points: doc.data().points,
                  });
                  console.log("Test", this.players)
                } else if (type === "modified") {
                  this.players.splice(oldIndex, 1);
                  this.players.splice(newIndex, 0, doc.data());
                } else if (type === "removed") {
                  this.players.splice(oldIndex, 1);
                }
              });
            })

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
      }
    },
    inputRecords(input) {
      this.userInputs.push(input);
      console.log(this.userInputs);
    },
    checkAnswer() {
      console.log(this.userInput);
      console.log("Answer: " + this.$store.state.answer);
      this.inputRecords(this.userInput);
      if (this.userInput === this.$store.state.answer) {
        this.inputRecords("YOU GOT THE ANSWER!");
        this.addPoints();
        console.log("That was correct!");
      }
    },
    //remember to reset points if router path goes back to root
    addPoints() {
      // let points = pointsWon;
      // this.userPoints += pointsWon;
      firebase
        .firestore()
        .collection("sessions")
        .doc("gummosucc")
        .collection("players")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((doc) => {
          console.log(doc.data());
          this.userPoints = doc.data().points + 500;
          // points = points + doc.data().points;
          console.log(doc.data().points);
          firebase
            .firestore()
            .collection("sessions")
            .doc("gummosucc")
            .collection("players")
            .doc(firebase.auth().currentUser.email)
            .update({ points: this.userPoints })
            .then(() => {
              this.updateTable();
            });
        });
    },

    updateTable() {
      firebase
        .firestore()
        .collection("sessions")
        .doc("gummosucc")
        .collection("players")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((doc) => {
          this.userPoints = doc.data().points;
        });
    },
  },
};
</script>

<style scoped src="../assets/styles/VideoPage.css">
</style>
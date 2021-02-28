
<template>
  <div id="VideoPage">
    <VideoChat id="vidChat" msg="Flash Study" />
    <Flashcard />
    <Chat id="chat" />
    

    <h3>View Collection</h3>
    <select v-model="current" @change.prevent="opened">
      <option v-for="item in collections" :key="item.name">
        {{ item.name }}
      </option>
    </select>

    <ul>
      <li v-for="card in cards" :key="card.key">
        {{ card.key }} | {{ card.val }}
      </li>
    </ul>

    <button @click="shuffle">Shuffle</button>
  </div>
</template>


<script>
import VideoChat from "../components/VideoChat.vue";
import Flashcard from "../components/Flashcard.vue";
import Chat from "../components/Chat.vue";

import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
  name: "App",
  components: {
    VideoChat,
    Flashcard,
    Chat,
  },

  mounted() {
    this.load();
  },

  data() {
    return {
      collections: [],
      cards: [],
      key: "",
      val: "",
      name: "",
      current: "",
      open: false,
    };
  },
  methods: {
    shuffle() {
        console.log(this.cards)
        for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        console.log(this.cards)
    }
    },
    opened() {
      this.open = true;
      this.load();
    },
    async load() {
      console.log(firebase.auth().currentUser.email);
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
              } else if (type === "modified") {
                this.cards.splice(oldIndex, 1);
                this.cards.splice(newIndex, 0, doc.data());
              } else if (type === "removed") {
                this.cards.splice(oldIndex, 1);
              }
            });
          });
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
            } else if (type === "modified") {
              this.collections.splice(oldIndex, 1);
              this.collections.splice(newIndex, 0, doc.data());
            } else if (type === "removed") {
              this.collections.splice(oldIndex, 1);
            }
          });
        });
    },
  },
};
</script>

<style scoped>
#chat {
  display: inline;
  border: 1px solid black;
  float: right;
}
#vidChat {
  width: 100%;
}
</style>
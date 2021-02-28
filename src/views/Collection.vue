<template>
  <div class="login">
    <h1 id="titleCollection">Collection</h1>
    <div id="CollectionMain">
    <h3>Create a New Collection</h3>
    <form @submit.prevent="pressed2">
      <div class="name">
        <input class="inputField" type="text" v-model="name" placeholder="Collection Name:" />
      </div>
      <button class="submitBtn" type="submit">Submit</button>
    </form>
    <h3>View Collection</h3>
    <select id="DropdownMenu" v-model="current" @change.prevent="opened">
      <option id="DropdownOptions" v-for="item in collections" :key="item.name">
        {{ item.name }}
      </option>
    </select>
    <br />
    <ul>
      <li v-for="card in cards" :key="card.key">
          {{card.key}}  |  {{card.val}}
      </li>
    </ul>
    <h3 id="addCards">Add Cards</h3>
    <form @submit.prevent="pressed">
      <div class="key">
        <label >Term:     </label>
        <input id="term" type="text" class="inputField" v-model="key" placeholder="Term" />
      </div>
      <div class="val">
        <label>Answer:</label>
        <input type="text" class="inputField" v-model="val" placeholder="Answer" />
      </div>
      <button class="submitBtn" type="submit">Add Cards</button>
    </form>
    </div>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
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
    async pressed() {
      try {
        if (this.open) {
          await firebase
            .firestore()
            .collection("accounts")
            .doc(firebase.auth().currentUser.email)
            .collection("collections")
            .doc(this.current)
            .collection("cards")
            .doc(this.key)
            .set({
              key: this.key,
              val: this.val,
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async pressed2() {
      try {
        await firebase
          .firestore()
          .collection("accounts")
          .doc(firebase.auth().currentUser.email)
          .collection("collections")
          .doc(this.name)
          .set({
            name: this.name,
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.err {
  color: red;
  font-size: 20px;
}
</style>

<style src="../assets/styles/Collection.css"></style>
<template>
  <div class="login">
    <h1>Collection</h1>
    <hr />
    <h3>Create a New Collection</h3>
    <form @submit.prevent="pressed2">
      <div class="name">
        <input type="text" v-model="name" placeholder="Collection Name:" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <hr />
    <h3>View Collection</h3>
    <select v-model="current" @change.prevent="opened">
      <option v-for="item in collections" :key="item.name">
        {{ item.name }}
      </option>
    </select>
    <br />
    <ul>
      <li v-for="card in cards" :key="card.key">
          {{card.key}}  |  {{card.val}}
      </li>
    </ul>
    <hr />
    <h3>Add Cards</h3>
    <form @submit.prevent="pressed">
      <div class="key">
        <input type="text" v-model="key" placeholder="Key:" />
      </div>
      <div class="val">
        <input type="text" v-model="val" placeholder="Value:" />
      </div>
      <button type="submit">Submit</button>
    </form>
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
            .add({
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
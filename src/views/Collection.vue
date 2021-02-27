<template>
  <div class="login">
    <h1>Collection</h1>
    <hr />
    <ul>
      <li v-for="card in collection" :key="card.key">{{ card.key }}</li>
    </ul>
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
    firebase
      .firestore()
      .collection("accounts")
      .doc(firebase.auth().currentUser.email)
      .collection("collections")
      .onSnapshot((ref) => {
        ref.docChanges().forEach((change) => {
          const { newIndex, oldIndex, doc, type } = change;
          if (type === "added") {
            this.collection.push(doc.data());
          } else if (type === "modified") {
            this.collection.splice(oldIndex, 1);
            this.collection.splice(newIndex, 0, doc.data());
          } else if (type === "removed") {
            this.collection.splice(oldIndex, 1);
          }
        });
      });
  },
  data() {
    return {
      collection: [],
      key: '',
      val: '',
    };
  },
  methods: {
    async pressed() {
      try {
        await firebase.firestore().collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .collection("collections")
        .add({
          key: this.key,
          val: this.val
        });
      } catch (err) {
        console.log(err)
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

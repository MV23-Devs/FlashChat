 <template>

    <div>hi</div>
 
</template>

 <script>
    import { firebase } from "@firebase/app";
    import "firebase/auth";

    export default {
        name: "Flashcard",
        mounted() {
            firebase
                .firestore()
                .collection("accounts")
                .doc(firebase.auth().currentUser.email)
                .collection("collections")
                .doc("rest")
                .get()
                .then(doc => {
                    console.log(doc.data())
                })
        }
    }
 </script>
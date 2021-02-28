 <template>
    <div>
        <ul> 
        </ul>    
        <form @submit.prevent = "checkAnswer" id = 'answerForm'>
            <label>Enter Answer Here:</label>
            <input type="text" v-on:input="userInput = $event.target.value"/>
            <button>Check Answer!</button>
        </form>
    </div>
 
</template>

<script>
    import { firebase } from "@firebase/app";
    import "firebase/auth";

    export default {
        data() {
          return {
            userInputs: [],
            answer: "",
            userInput: ""
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
          .doc("Fad9GLEXNnxbnNxbeF1J")
          .get()
          .then(doc => {
            console.log(doc.data());
            this.answer = doc.data().val;
            console.log(this.answer);
          })
        },

        methods: {
            inputRecords(input) {
                this.userInputs.push(input);
                console.log(this.userInputs);
            }, 
            checkAnswer() {
                firebase
                .firestore()
                .collection("accounts")
                .doc(firebase.auth().currentUser.email)
                .collection("collections")
                .doc("Test")
                .collection("cards")
                .doc("Fad9GLEXNnxbnNxbeF1J")
                .get()
                .then(doc => {
                    console.log(doc.data());
                    this.answer = doc.data().val;
                    console.log(this.answer);
                })
                console.log(this.userInput);
                console.log(this.answer);
                this.inputRecords(this.userInput);
                if (this.userInput === this.answer) {
                    //NEED TO ADD STUFF
                    console.log("That was correct!");
                }
            }
            

        }
    }
</script>


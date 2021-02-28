<template>
    <table>
        <thead>
            <tr>
                <th>Player name</th>
                <th>Player points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{this.user}}</td>
                <td>{{this.userPoints}}</td>
            </tr>
            <tr>
                <td>saarang.bondalapati@gmail.com</td>
                <td>500</td>
            </tr>
        </tbody>

    </table>    
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth";

export default {
    data() {
        return {
            userPoints: this.userPoints,
            user: this.email,
        }  
    },
    mounted() {
        firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then(doc => {
            this.userPoints = doc.data().points;
            this.user = doc.data().email;
        })
    }
}
</script>

<style scoped>

</style>
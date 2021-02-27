 <template>
    <div>
        <form>
            <label>Enter Answer Here:</label>
            <input type="text" />
        </form>
    </div>
 
</template>

<script>
    import { firebase } from "@firebase/app";
    import "firebase/auth";

    export default {
        components: {
            Chat
        },
        data() {
            return {

            }
        }
    }
</script>


<template>
  <div class="hello">
    <div class="agora-title-box">
      <div class="agora-title">FLASH Chat</div>
    </div>
    <div class="agora-box" id="MainBox">
      <div class="agora-input">
        <div class="agora-text">* Appid</div>
        <el-input
          v-model="option.appid"
          placeholder="Appid"
          clearable
        ></el-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">Token</div>
        <el-input
          v-model="option.token"
          placeholder="Token"
          clearable
        ></el-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">* Channel Name</div>
        <el-input
          v-model="option.channel"
          placeholder="Channel Name"
          clearable
        ></el-input>
      </div>
      <div class="agora-button">
        <el-button
          type="primary"
          class="Buttons1"
          id="JoinBtn"
          @click="joinEvent"
          :disabled="disableJoin"
          >Join</el-button
        >
        <br />
        <!-- <el-button
          type="primary"
          @click="leaveEvent"
          plain
          :disabled="!disableJoin"
          class="Buttons1"
          id="LeaveBtn"
          >Leave
        </el-button> -->
      </div>
    </div>
    <el-button
      type="primary"
      @click="leaveEvent"
      plain
      :disabled="!disableJoin"
      class="Buttons1"
      id="LeaveBtn"
      >Leave
    </el-button>
    <div class="agora-view">
      <div class="agora-video">
        <StreamPlayer
          :stream="localStream"
          :domId="localStream.getId()"
          v-if="localStream"
        ></StreamPlayer>
      </div>
      <div
        class="agora-video"
        :key="index"
        v-for="(remoteStream, index) in remoteStreams"
      >
        <StreamPlayer
          :stream="remoteStream"
          :domId="remoteStream.getId()"
        ></StreamPlayer>
      </div>
    </div>
  </div>
</template>

<script>
import RTCClient from "../agora-rtc-client";
import StreamPlayer from "./stream-player";
import { log } from "../utils/utils";
export default {
  components: {
    StreamPlayer,
  },
  data() {
    return {
      option: {
        appid: "",
        token: "",
        uid: null,
        channel: "",
      },
      disableJoin: false,
      localStream: null,
      remoteStreams: [],
    };
  },
  props: {
    msg: String,
  },

  methods: {
    joinEvent() {
      document.getElementById("MainBox").style.display = "none";
      this.$parent.showNotVideo()

      if (!this.option.appid) {
        this.judge("Appid");
        return;
      }
      if (!this.option.channel) {
        this.judge("Channel Name");
        return;
      }
      this.$router.push("/VideoPage");
      this.rtc
        .joinChannel(this.option)
        .then(() => {
          this.$message({
            message: "Join Success",
            type: "success",
          });
          this.rtc
            .publishStream()
            .then((stream) => {
              this.$message({
                message: "Publish Success",
                type: "success",
              });
              this.localStream = stream;
            })
            .catch((err) => {
              this.$message.error("Publish Failure");
              log("publish local error", err);
            });
        })
        .catch((err) => {
          this.$message.error("Join Failure");
          log("join channel error", err);
        });
      this.disableJoin = true;
      console.log("disableJoin = true")
    },
    leaveEvent() {
      this.$router.push("/");
      this.disableJoin = false;
      console.log("disableJoin = false")
      this.rtc
        .leaveChannel()
        .then(() => {
          this.$message({
            message: "Leave Success",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("Leave Failure");
          log("leave error", err);
        });
      this.localStream = null;
      this.remoteStreams = [];
    },
    judge(detail) {
      this.$notify({
        title: "Notice",
        message: `Please enter the ${detail}`,
        position: "top-left",
        type: "warning",
      });
    },
  },
  created() {
    this.rtc = new RTCClient();
    let rtc = this.rtc;
    rtc.on("stream-added", (evt) => {
      let { stream } = evt;
      log("[agora] [stream-added] stream-added", stream.getId());
      rtc.client.subscribe(stream);
    });

    rtc.on("stream-subscribed", (evt) => {
      let { stream } = evt;
      log("[agora] [stream-subscribed] stream-added", stream.getId());
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream);
      }
    });
    rtc.on("stream-removed", (evt) => {
      let { stream } = evt;
      log("[agora] [stream-removed] stream-removed", stream.getId());
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== stream.getId()
      );
    });
    rtc.on("peer-online", (evt) => {
      this.$message(`Peer ${evt.uid} is online`);
    });
    rtc.on("peer-leave", (evt) => {
      this.$message(`Peer ${evt.uid} already leave`);
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== evt.uid
      );
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
  /* margin: auto; */
  width: 100%;
}
.agora-title {
  margin: top 50px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin: auto;
}
.agora-box {
  display: inline-block;
}

.agora-view {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.agora-video {
  width: 640px;
  height: 480px;
  margin: 0px;
}
.agora-video > div {
  width: 640px;
  height: 480px;
  padding: 0px;
  margin: auto;
  background-color: red;
  position: relative !important;
  overflow: visible;
}

.agora-input {
  margin: 20px;
  width: 320px;
}
.agora-text {
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
}
.agora-button {
  display: inline-block;
  width: 180px;
  justify-content: space-between;
  margin: 20px;
}

.Buttons1 {
  margin: 5px;
  position: relative;
  border-radius: 20px;
  border: 0px solid #000;
  color: #fff;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  transition: padding 1s;
}
.Buttons1:hover {
  animation-fill-mode: forwards;
  padding-left: 70px;
  padding-right: 70px;
  transition: padding 1s;
}

#JoinBtn {
  background-color: deepskyblue;
}

#LeaveBtn {
  color: deepskyblue;
  display: block;
  margin: auto;
}
</style>

<style>
video {
  position: relative !important;
  /* padding: 20px; */
  /* margin: 100px; */
  background-color: red;
}
</style>
<template>
  <div id="DisplayCard">
    <div id="CardHitbox">
      <div id="Card">
        <h1>clue: {{ clue }}</h1>
        <h2>answer: {{ answer }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayCard",
  props: {
    clue: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
};
</script>

<style src='../assets/styles/DisplayCard.css'>
</style>
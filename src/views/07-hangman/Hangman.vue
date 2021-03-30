<template>
  <div class="Hangman">
    <h1>猜单词</h1>
    <p>输入字母，找到隐藏的单词</p>
    <game-container
      ref="game"
      @inputError="showNotification"
      @gameOver="popupFinal"
    />
    <!-- container of final message -->
    <popup-message ref="popup" @restart="gameRestart" />
    <!-- Notification -->
    <notification ref="notification" />
  </div>
</template>

<script>
import Notification from "../../components/common/Notification.vue";
import PopupMessage from "../../components/common/PopupMessage.vue";
import GameContainer from "./childComps/GameContainer.vue";
export default {
  name: "Hangman",
  components: { GameContainer, Notification, PopupMessage },
  methods: {
    showNotification() {
      this.$refs.notification.show("你已经用过这个字母了，试试别的吧");
    },
    popupFinal(message) {
      this.$refs.popup.show(message);
    },
    gameRestart() {
      this.$refs.game.restartGame();
    },
  },
};
</script>

<style scoped>
.Hangman {
  background-color: #34495e;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
h1 {
  margin: 40px 0 0;
}
</style>

<template>
  <div class="popup-container" v-show="isShow">
    <div class="popup">
      <h2>{{ message }}</h2>
      <button @click="btnClick">再玩一次</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupMessage",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message) {
      this.message = message;
      this.isShow = true;
    },
    btnClick() {
      this.isShow = false;
      this.$emit("restart");
    },
  },
};
</script>

<style scoped>
.popup-container {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  background: #2980b9;
  border-radius: 5px;
  box-shadow: 0 15px 10px 3px rgb(0 0 0 / 10%);
  padding: 20px;
  text-align: center;
}
.popup button {
  /* cursor: pointer; */
  background-color: #fff;
  color: #2980b9;
  border: 0;
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
}
</style>

<template>
  <transition>
    <div class="notification-container" v-show="isShow">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.notification-container {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px 10px 0 0;
  padding: 15px 20px;
  position: fixed;
  bottom: 0px;
  text-align: center;
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease-in-out;
}
.v-enter,
.v-leave-to {
  transform: translateY(50px);
}
</style>

<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "Fade",
};
</script>

<style scoped>
.v-enter-active {
  animation: 0.5s ease fade-in;
}
.v-leave-active {
  animation: 0.5s ease reverse fade-in;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

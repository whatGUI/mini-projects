<template>
  <div class="relaxer-app">
    <h1>深呼吸放松小助手</h1>

    <div class="container">
      <div class="circle"></div>

      <p>{{ guideStr }}</p>

      <div
        class="pointer-container"
        @animationstart="guideStrChange"
        @animationiteration="guideStrChange"
      >
        <span class="pointer"></span>
      </div>

      <div class="gradient-circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelaxerApp",
  data() {
    return {
      guideStr: "",
      breatheTime: (7500 / 5) * 2,
      holdTime: 7500 / 5,
    };
  },
  methods: {
    guideStrChange() {
      // 1. 定义三个setInterval，并使用setTimeout延时开启，由<pointer>的animationstart事件触发
      // setTimeout(() => {
      //   this.guideStr='吸气'
      //   setInterval(() => {this.guideStr='吸气'}, 7500);
      // }, 0);
      // setTimeout(() => {
      //   this.guideStr='屏气'
      //   setInterval(() => {this.guideStr='屏气'}, 7500);
      // }, 3000);
      // setTimeout(() => {
      //   this.guideStr='呼气'
      //   setInterval(() => {this.guideStr='呼气'}, 7500);
      // }, 4500);

      // 2. 不使用setInterval，利用animationstart和animationiteration两个事件来触发
      setTimeout(() => {
        this.guideStr = "吸气";
        setTimeout(() => {
          this.guideStr = "屏气";
          setTimeout(() => {
            this.guideStr = "呼气";
          }, this.holdTime);
        }, this.breatheTime);
      }, 0);
    },
  },
};
</script>

<style scoped>
.relaxer-app {
  background: #224941 url(~@/assets/img/16-relaxer-app/bg.jpg) no-repeat center
    center/cover;
  color: #fff;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 300px;
  width: 300px;
  position: relative;
  transform: scale(1);
  animation: scale 7.5s linear forwards infinite;
}
.circle {
  background-color: #010f1c;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.pointer-container {
  position: absolute;
  top: -40px;
  left: 140px;
  width: 20px;
  height: 190px;
  animation: rotate 7.5s linear forwards infinite;
  transform-origin: bottom center;
}
.pointer {
  background-color: #fff;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: block;
}
.gradient-circle {
  background: conic-gradient(
    #55b7a4 0%,
    #4ca493 40%,
    #fff 40%,
    #fff 60%,
    #336d62 60%,
    #2a5b52 100%
  );
  height: 320px;
  width: 320px;
  z-index: -2;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: -10px;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
@keyframes scale {
  from {
    transform: scale(1);
  }
  40% {
    transform: scale(1.2);
  }
  60% {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>

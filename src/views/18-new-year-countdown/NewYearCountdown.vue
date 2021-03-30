<template>
  <div class="new-year-countdown">
    <h1>新年倒计时</h1>
    <div class="countdown" v-show="isShow">
      <div class="time">
        <h2>{{ days }}</h2>
        <small>天</small>
      </div>
      <div class="time">
        <h2>{{ hours | timeFormat }}</h2>
        <small>小时</small>
      </div>
      <div class="time">
        <h2>{{ minutes | timeFormat }}</h2>
        <small>分钟</small>
      </div>
      <div class="time">
        <h2>{{ seconds | timeFormat }}</h2>
        <small>秒</small>
      </div>
    </div>
    <div class="year">{{ currentYear + 1 }}</div>

    <img
      src="@/assets/img/18-new-year-countdown/spinner.gif"
      alt="Loading..."
      class="loading"
      v-show="!isShow"
    />
  </div>
</template>

<script>
export default {
  name: "NewYearCountdown",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      newYearTime: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      handler: {},
      isShow: false,
    };
  },
  mounted() {
    this.newYearTime = new Date(this.currentYear + 1, 0);
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
    this.handler = setInterval(this.updateCountDown, 1000);
  },
  beforeDestroy() {
    clearInterval(this.handler);
  },
  methods: {
    // 倒计时更新
    updateCountDown() {
      const currentTime = new Date();
      const diff = this.newYearTime - currentTime;
      this.days = Math.floor(diff / 1000 / 24 / 60 / 60);
      this.hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      this.minutes = Math.floor(diff / 1000 / 60) % 60;
      this.seconds = Math.floor(diff / 1000) % 60;
    },
  },
  filters: {
    timeFormat(val) {
      return val < 10 ? "0" + val : val;
    },
  },
};
</script>

<style scoped>
.new-year-countdown {
  background-image: url(https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  overflow: hidden;
}
h1 {
  font-size: 60px;
  margin: -80px -40px 40px 0;
  letter-spacing: 40px;
}
.countdown {
  display: flex;
  transform: scale(2);
}
.time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
}
.time h2 {
  margin: 0 0 5px;
}
.year {
  font-size: 200px;
  opacity: 0.2;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

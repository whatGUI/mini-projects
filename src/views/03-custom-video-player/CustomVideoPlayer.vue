<template>
  <div class="custom-video-player">
    <h1>自定义视频播放器</h1>

    <div
      class="player"
      @mouseenter="isMouseIn = true"
      @mouseleave="isMouseIn = false"
      :style="playerStyle"
    >
      <video
        :controls="controlsActive"
        ref="player"
        @dblclick="switchFullScreen"
        @timeupdate="setTime"
        @loadedmetadata="getDuration"
        @ended="stopVideo"
      >
        <source
          src="@/assets/video/03-custom-video-player/sintel-short.webm"
          type="video/webm"
        />
        <!-- fallback content here -->
      </video>

      <transition name="fade">
        <p class="reminder" v-show="reminder">双击进入全屏模式</p>
      </transition>

      <div class="timer" @click="jumpTo" ref="timeWrapper">
        <div class="bar" :style="{ width: timerWidth * 100 + '%' }"></div>
      </div>

      <div class="control" v-show="isMouseIn">
        <button
          class="play"
          @click="playPauseVideo"
          aria-label="play pause toggle"
        >
          <font-awesome-icon :icon="getIcon" />
        </button>

        <button class="stop" @click="stopVideo" aria-label="stop">
          <font-awesome-icon icon="stop" />
        </button>

        <p class="time" aria-label="timer">
          {{ currentVideoTime | timeFormatter }} /
          {{ fullVideoTime | timeFormatter }}
        </p>

        <button
          class="rewind"
          :class="{ active: isRewind }"
          @click="videoRewind"
          aria-label="rewind"
        >
          <font-awesome-icon icon="backward" />
        </button>

        <button
          class="forward"
          :class="{ active: isForward }"
          @click="videoForward"
          aria-label="fast forward"
        >
          <font-awesome-icon icon="forward" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomVideoPlayer",
  data() {
    return {
      controlsActive: true,
      currentVideoTime: 0,
      fullVideoTime: 0,
      timerWidth: 0,
      isMouseIn: true,
      fullscreenStatus: false,
      reminder: true,
      intervalFwd: null,
      intervalRwd: null,
      isForward: false,
      isRewind: false,
      isPlay: false,
    };
  },

  methods: {
    // 暂停/播放
    playPauseVideo() {
      clearInterval(this.intervalRwd);
      clearInterval(this.intervalFwd);
      this.isRewind = false;
      this.isForward = false;
      if (this.$refs.player.paused) {
        this.$refs.player.play();
        this.isPlay = true;
      } else {
        this.$refs.player.pause();
        this.isPlay = false;
      }
    },
    // 停止播放
    stopVideo() {
      this.$refs.player.pause();
      this.$refs.player.currentTime = 0;
      this.isPlay = false;
      clearInterval(this.intervalRwd);
      clearInterval(this.intervalFwd);
      this.isRewind = false;
      this.isForward = false;
    },
    // 进度条&当前播放时间更新
    setTime() {
      this.currentVideoTime = this.$refs.player.currentTime;
      this.timerWidth = this.currentVideoTime / this.fullVideoTime;
    },
    // 获得视频时长
    getDuration() {
      this.fullVideoTime = this.$refs.player.duration;
    },
    // 进度条跳转
    jumpTo(e) {
      let timerPosition = this.$refs.timeWrapper.getBoundingClientRect();
      this.$refs.player.currentTime =
        this.fullVideoTime * ((e.x - timerPosition.x) / timerPosition.width);
    },
    // 切换全屏播放
    switchFullScreen(e) {
      if (this.fullscreenStatus) {
        document.exitFullscreen();
        this.fullscreenStatus = false;
      } else {
        e.target.requestFullscreen();
        this.fullscreenStatus = true;
      }
    },
    // 视频快退
    videoRewind() {
      clearInterval(this.intervalFwd);
      this.isForward = false;
      if (this.isRewind) {
        clearInterval(this.intervalRwd);
        this.isRewind = false;
        this.$refs.player.play();
      } else {
        this.isRewind = true;
        this.$refs.player.pause();
        this.intervalRwd = setInterval(() => {
          if (this.currentVideoTime <= 3) {
            this.stopVideo();
          } else {
            this.$refs.player.currentTime -= 3;
          }
        }, 500);
      }
    },
    // 视频快进
    videoForward() {
      clearInterval(this.intervalRwd);
      this.isRewind = false;
      if (this.isForward) {
        clearInterval(this.intervalFwd);
        this.isForward = false;
        this.$refs.player.play();
      } else {
        this.isForward = true;
        this.$refs.player.pause();
        this.intervalFwd = setInterval(() => {
          if (this.currentVideoTime >= this.fullVideoTime - 3) {
            this.stopVideo();
          } else {
            this.$refs.player.currentTime += 3;
          }
        }, 500);
      }
    },
    // 空格键暂停/播放
    spaceControl(e) {
      if (e.code === "Space") {
        this.playPauseVideo();
      }
    },
  },

  computed: {
    playerStyle() {
      if (!this.isMouseIn) {
        return { "border-radius": "10px" };
      } else {
        return "";
      }
    },
    // 根据播放/暂停状态切换按钮图标
    getIcon() {
      if (this.isPlay === true) {
        return "pause";
      } else {
        return "play";
      }
    },
  },

  filters: {
    timeFormatter(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);
      let minuteValue = minutes,
        secondValue = seconds;
      if (minutes < 10) {
        minuteValue = "0" + minutes;
      }
      if (seconds < 10) {
        secondValue = "0" + seconds;
      }
      return minuteValue + ":" + secondValue;
    },
  },

  mounted() {
    this.controlsActive = false;
    // 功能提醒
    setTimeout(() => {
      this.reminder = false;
    }, 2000);
    document.addEventListener("keyup", this.spaceControl);
  },
  destroyed() {
    document.removeEventListener("keyup", this.spaceControl);
  },
};
</script>

<style scoped>
.custom-video-player {
  text-align: center;
  color: #2c3e50;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.player {
  width: 60vw;
  height: 33.75vw;
  background-color: rgb(34, 34, 34);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
}
video {
  width: 100%;
  object-fit: contain;
}
.reminder {
  position: absolute;
  bottom: 20px;
  border-radius: 1px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 auto;
  left: 0;
  right: 0;
}
.timer {
  position: absolute;
  bottom: 5px;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 98.5%;
  height: 4px;
  cursor: pointer;
  background-color: rgb(51, 51, 51);
  z-index: 1;
}
.timer .bar {
  height: 4px;
  z-index: 2;
  background-color: rgb(35, 173, 229);
}
.control {
  background-color: rgb(34, 34, 34);
  width: 100%;
  position: absolute;
  bottom: -50px;
  margin: 0 auto;
  transition: 1s all;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.play {
  flex: 1;
}
.stop {
  flex: 1;
}
.time {
  flex: 10;
  user-select: none;
  color: rgba(255, 255, 255, 0.9);
}
.rewind {
  flex: 1;
}
.rewind.active {
  color: rgb(35, 173, 229);
}
.forward {
  flex: 1;
}
.forward.active {
  color: rgb(35, 173, 229);
}
button {
  cursor: pointer;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.5);
  border: 0;
  outline: 0px;
}
button:hover {
  color: rgba(255, 255, 255, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

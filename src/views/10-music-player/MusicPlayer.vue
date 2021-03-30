<template>
  <div class="music-player">
    <h1>音乐播放器</h1>
    <div class="player-container" :class="{ play: isPlay }">
      <div class="music-info">
        <h4>{{ musicList[currentMusic] }}</h4>
        <div
          class="progress-container"
          ref="progressContainer"
          @click="changeProgress"
        >
          <div class="progress" :style="{ width: progressPercent }"></div>
        </div>
      </div>

      <audio
        :src="getMusicSrc"
        ref="audioPlayer"
        @ended="nextSong"
        @timeupdate="updateProgress"
      ></audio>

      <div class="img-container">
        <img :src="getImgSrc" alt="music-cover" />
      </div>

      <div class="navigation">
        <button class="nav-btn prevSong" @click="prevSong">
          <font-awesome-icon icon="backward" />
        </button>
        <button class="nav-btn btn-big" @click="playAndPause">
          <font-awesome-icon :icon="getIcon" />
        </button>
        <button class="nav-btn nextSong" @click="nextSong">
          <font-awesome-icon icon="forward" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      musicList: ["ukulele", "summer", "hey"],
      currentMusic: 0,
      isPlay: false,
      progressPercent: "0%",
    };
  },
  computed: {
    // 根据播放/暂停状态切换按钮图标
    getIcon() {
      if (this.isPlay === true) {
        return "pause";
      } else {
        return "play";
      }
    },
    // 动态获得音频文件的地址
    getMusicSrc() {
      return require(`@/assets/music/10-music-player/${
        this.musicList[this.currentMusic]
      }.mp3`);
    },
    // 动态获得图片的地址
    getImgSrc() {
      return require(`@/assets/img/10-music-player/${
        this.musicList[this.currentMusic]
      }.jpg`);
    },
  },
  methods: {
    // 点击播放、暂停按钮的判断
    playAndPause() {
      if (this.isPlay === false) {
        this.play();
      } else {
        this.pause();
      }
    },
    // 播放
    play() {
      this.isPlay = true;
      this.$refs.audioPlayer.play();
    },
    // 暂停
    pause() {
      this.isPlay = false;
      this.$refs.audioPlayer.pause();
    },
    // 上一首歌
    prevSong() {
      this.currentMusic--;
      if (this.currentMusic < 0) {
        this.currentMusic = this.musicList.length - 1;
      }
      this.$nextTick(() => {
        this.play();
      });
    },
    // 下一首歌
    nextSong() {
      this.currentMusic++;
      if (this.currentMusic > this.musicList.length - 1) {
        this.currentMusic = 0;
      }
      this.$nextTick(() => {
        this.play();
      });
    },
    // 更新进度条
    updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      this.progressPercent = (currentTime / duration) * 100 + "%";
    },
    // 点击进度条跳转
    changeProgress(e) {
      const width = this.$refs.progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = this.$refs.audioPlayer.duration;
      this.$refs.audioPlayer.currentTime = duration * (clickX / width);
    },
  },
};
</script>

<style scoped>
.music-player {
  background-image: linear-gradient(
    0deg,
    rgba(206, 230, 250, 1) 23.8%,
    rgba(149, 187, 228, 1) 92%
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Lato", sans-serif;
  margin: 0;
}
.player-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgb(149 187 228 / 60%);
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 100px 0;
  z-index: 10;
}
.music-info {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}
.player-container.play .music-info {
  opacity: 1;
  transform: translateY(-100%);
}
.music-info h4 {
  margin: 0;
}
.progress-container {
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}
.progress {
  background-color: #fe8daa;
  border-radius: 5px;
  height: 100%;
  width: 0%;
  transition: width 0.1s linear;
}
.img-container {
  position: relative;
  width: 110px;
}
.img-container img {
  border-radius: 50%;
  object-fit: cover;
  height: 110px;
  width: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
}
.player-container.play .img-container img {
  animation-play-state: running;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.img-container::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 50%);
}
.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.nav-btn {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}
.nav-btn:focus {
  outline: 0;
}
.nav-btn.btn-big {
  color: #cdc2d0;
  font-size: 30px;
}
</style>

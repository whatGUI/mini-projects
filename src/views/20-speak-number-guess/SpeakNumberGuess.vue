<template>
  <div class="speak-number-guess">
    <div v-show="!showWinInfo">
      <div class="img-container">
        <img
          src="@/assets/img/20-speak-number-guess/mic.png"
          alt="Speak"
          @click="SRToggle"
          :class="{ start: isStart }"
        />
      </div>
      <font-awesome-icon v-show="isStart" spin icon="spinner" />
      <h1>猜一个介于1到100之间的数字</h1>
      <h3>点击麦克风图标后大声说出来！</h3>
      <small>仅限Chrome浏览器和特殊网络条件下</small>
      <div id="msg" class="msg" v-show="showResult"><span>{{result}}</span>{{ message }}</div>
    </div>

    <div class="win-info" v-show="showWinInfo">
      <h2>
        恭喜你猜对了<br /><br />
        这个数字就是 {{ randomNum }}
      </h2>
      <button class="play-again" id="play-again" @click="playAgain">
        再试一次
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeakNumberGuess",
  data() {
    return {
      message: "",
      recognition: {},
      randomNum: 0,
      result:'',
      showWinInfo: false,
      showResult:false,
      isStart: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.recognition.removeEventListener("result", this.onSpeak);
    this.recognition.removeEventListener("end", this.onSREnd);
  },
  methods: {
    // 初始化语音识别接口
    init() {
      this.randomNum = this.getRandomNumber();
      console.log("Number:", this.randomNum);
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new window.SpeechRecognition();
      this.recognition.addEventListener("result", this.onSpeak);
      this.recognition.addEventListener("end", this.onSREnd);
    },
    // 识别开启或关闭
    SRToggle() {
      this.isStart = !this.isStart;
      if (this.isStart) {
        this.startSR();
      } else {
        this.stopSR();
      }
    },
    // 语音识别开始
    startSR() {
      this.recognition.start();
    },
    // 语音识别停止
    stopSR() {
      this.recognition.stop();
    },
    // 语音识别服务断开连接后执行
    onSREnd() {
      this.isStart = false;
    },
    // 识别完成后执行
    onSpeak(e) {
      const msg = e.results[0][0].transcript;
      this.result = msg;
      this.checkNumber(msg);
      this.showResult = true;
    },
    // 检查结果
    checkNumber(msg) {
      const num = +msg;

      // Check if valid number
      if (Number.isNaN(num)) {
        this.message = " 这不是一个数字";
        return;
      }

      // Check in range
      if (num > 100 || num < 1) {
        this.message = " 数字应该介于1到100";
        return;
      }

      // Check number
      if (num === this.randomNum) {
        this.showWinInfo = true;
      } else if (num > this.randomNum) {
        this.message = " 比这个数大";
      } else {
        this.message = " 比这个数小";
      }
    },
    // 页面重载开始下一次
    playAgain() {
      window.location.reload();
    },
    getRandomNumber() {
      return Math.floor(Math.random() * 100) + 1;
    },
  },
};
</script>

<style scoped>
.speak-number-guess {
  background: #2f3542 url("../../assets/img/20-speak-number-guess/bg.jpg")
    no-repeat left center/cover;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
}

h1,
h3 {
  margin-bottom: 0;
}

p {
  line-height: 1.5;
  margin: 0;
}
.img-container {
  width: 256px;
  height: 256px;
  margin: 0 auto;
}
.img-container img {
  cursor: pointer;
  transition: transform 0.5s ease;
  transform: scale(0.6);
}
.img-container .start {
  transform: scale(1);
}
.play-again {
  padding: 8px 15px;
  border: 0;
  background: #f4f4f4;
  border-radius: 5px;
  margin-top: 10px;
}

.msg {
  font-size: 1.5em;
  margin-top: 40px;
}
.msg span{
  border: 1px solid #fff;
}
.box {
  border: 1px solid #dedede;
  display: inline-block;
  font-size: 30px;
  margin: 20px;
  padding: 10px;
}
</style>

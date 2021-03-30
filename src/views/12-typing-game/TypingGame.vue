<template>
  <div class="typing-game">
    <h1 class="header">打字游戏</h1>

    <div class="setting" :class="{ show: showSetting }">
      <label for="difficulty">难度：</label>
      <select id="difficulty" v-model="difficulty" @change="saveSetting">
        <option value="easy">简单</option>
        <option value="medium">普通</option>
        <option value="hard">困难</option>
      </select>
    </div>

    <div class="container">
      <div class="score">
        分数：<span>{{ score }}</span>
      </div>

      <div class="time-bar">
        <p>剩余时间：{{ time.toFixed(0) }}</p>
        <progress :max="maxTime" :value="time">
          {{ time }}/{{ maxTime }}
        </progress>
      </div>

      <div class="word">{{ currentWord }}</div>
      <input
        type="text"
        v-model="wordInput"
        @input="typing"
        ref="text"
        placeholder="输入单词..."
      />

      <div class="start-game-container" v-show="showStartContent">
        <p>在有限的时间内尽可能打出更多的单词吧！</p>
        <button @click="start">开始</button>
      </div>

      <div class="end-game-container" v-show="isGameOver">
        <h1>游戏结束</h1>
        <p>得分：{{ score }}</p>
        <div class="btn-container">
          <button @click="showSetting = true">难度设置</button>
          <button @click="gameStart">重新开始</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypingGame",
  data() {
    return {
      words: [
        "sigh",
        "tense",
        "airplane",
        "ball",
        "pies",
        "juice",
        "warlike",
        "bad",
        "north",
        "dependent",
        "steer",
        "silver",
        "highfalutin",
        "superficial",
        "quince",
        "eight",
        "feeble",
        "admit",
        "drag",
        "loving",
        "javascript",
        "html",
        "python"
      ],
      currentWord: "",
      difficulty: "medium",
      score: 0,
      time: 10,
      maxTime: 10,
      wordInput: "",
      isGameOver: false,
      showStartContent: true,
      showSetting: false,
    };
  },
  mounted() {
    if (localStorage.getItem("difficulty")) {
      this.difficulty = localStorage.getItem("difficulty");
    }
  },
  methods: {
    // 初始化游戏
    gameInit() {
      this.isGameOver = false;
      this.showSetting = false;
      this.time = 10;
      this.maxTime = 10;
      this.getRandomWord();
      this.$refs.text.focus();
    },
    // 点击开始按钮
    start() {
      this.showStartContent = false;
      this.gameStart();
    },
    // 游戏开始
    gameStart() {
      this.gameInit();
      const timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(timer);
          this.isGameOver = true;
        }
      }, 1000);
    },
    // 打字结果匹配与判断
    typing() {
      if (this.wordInput === this.currentWord) {
        this.score++;
        if (this.difficulty === "easy") {
          this.time += 5;
        }
        if (this.difficulty === "medium") {
          this.time += 3;
        }
        if (this.difficulty === "hard") {
          this.time += 2;
        }
        if (this.time > this.maxTime) {
          this.maxTime = this.time;
        }
        this.getRandomWord();
        this.wordInput = "";
      }
    },
    // 获得一个随机单词
    getRandomWord() {
      this.currentWord = this.words[
        Math.floor(Math.random() * (this.words.length - 1))
      ];
    },
    // 保存难度设置
    saveSetting() {
      localStorage.setItem("difficulty", this.difficulty);
    },
  },
};
</script>

<style scoped>
.typing-game {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
.header {
  margin-bottom: 30px;
  color: #212121;
}
.score {
  color: #212121;
  margin: 12px 0;
  font-size: 25px;
}
.time-bar {
  padding: 15px 0;
}
.time-bar p {
  color: #757575;
  font-size: 14px;
  margin: 0;
}
.word {
  color: #212121;
  font-size: 30px;
  padding: 20px 0;
  margin: 0 auto;
  border-top: 1px solid #757575;
}
button {
  background-color: #99ccff;
  color: #fff;
  font-weight: bold;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  padding: 5px 15px;
  margin: 0 5px;
}

select {
  width: 200px;
  padding: 5px;
  appearance: none;
  border-radius: 0;
  background-color: #99ccff;
}

select:focus,
button:focus {
  outline: 0;
}
.setting {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: 70px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}
.setting.show {
  transform: translateY(0);
}
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  color: #fff;
  position: relative;
  text-align: center;
  width: 500px;
}
h2 {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 4px;
  margin: 0 0 40px;
}

input {
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
  padding: 12px 20px;
  margin-top: 10px;
}

.start-game-container {
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 10px;
  color: #212121;
}
.end-game-container {
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 10px;
  color: #212121;
}
</style>
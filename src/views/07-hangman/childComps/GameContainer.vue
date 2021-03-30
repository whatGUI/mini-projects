<template>
  <div class="game-container">
    <svg height="250" width="200" class="figure-container">
      <!-- Rod -->
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />

      <!-- Head -->
      <circle cx="140" cy="70" r="20" v-show="showPic[0]" />
      <!-- Body -->
      <line x1="140" y1="90" x2="140" y2="150" v-show="showPic[1]" />
      <!-- Arms -->
      <line x1="140" y1="120" x2="120" y2="100" v-show="showPic[2]" />
      <line x1="140" y1="120" x2="160" y2="100" v-show="showPic[3]" />
      <!-- Legs -->
      <line x1="140" y1="150" x2="120" y2="180" v-show="showPic[4]" />
      <line x1="140" y1="150" x2="160" y2="180" v-show="showPic[5]" />
    </svg>

    <div class="wrong-letters-container" v-show="showWrongLetters">
      <p>错误记录</p>
      <p>{{ wrongLetters.join() }}</p>
    </div>

    <div class="word">
      <span
        class="letter"
        v-for="(item, index) in selectedWord"
        :key="index"
       
      >
      <span v-show="correctLetters.includes(item)"> {{ item }}</span>
       
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameContainer",
  data() {
    return {
      words: ["application", "programming", "interface", "wizard","vue","javascript"],
      selectedWord: "",
      correctLetters: [],
      wrongLetters: [],
      showPic: [],
      playable: true,
      showWrongLetters:false,
    };
  },
  mounted() {
    this.initWord();

    window.addEventListener("keyup", this.keyPressed);
  },
  destroyed() {
    window.removeEventListener("keyup", this.keyPressed);
  },
  methods: {
    // 初始化一个单词
    initWord() {
      this.selectedWord = this.words[
        Math.floor(Math.random() * this.words.length)
      ];
      console.log(this.selectedWord);
    },
    // 对按下的按键进行判断
    keyPressed(e) {
      if (this.playable) {
        if (e.key >= "a" && e.key <= "z") {
          const key = e.key.toLowerCase();
          if (![...this.correctLetters, ...this.wrongLetters].includes(key)) {
            if (this.selectedWord.includes(key)) {
              // 猜对了
              this.correctLetters.push(key);
              if (
                this.selectedWord
                  .split("")
                  .every((letter) => this.correctLetters.includes(letter))
              ) {
                // 游戏胜利
                this.playable = false;
                this.$emit("gameOver", "恭喜 你赢了！😃");
              }
            } else {
              // 猜错了
              this.showWrongLetters=true;
              this.wrongLetters.push(key);
              this.showPic.push(true);
              if (this.wrongLetters.length === 6) {
                // GAME OVER
                this.playable = false;
                this.$emit("gameOver", "Sorry，你失败了😕");
              }
            }
          } else {
            this.$emit("inputError");
          }
        }
      }
    },
    // 重新开始游戏
    restartGame() {
      this.initWord();
      this.wrongLetters = [];
      this.correctLetters = [];
      this.showPic = [];
      this.showWrongLetters=false;
      this.playable = true;
    },
  },
};
</script>

<style scoped>
.game-container {
  padding: 20px 30px;
  position: relative;
  margin: auto;
  height: 350px;
  width: 450px;
}
.figure-container {
  fill: transparent;
  stroke: #fff;
  stroke-width: 4px;
  stroke-linecap: round;
}
.wrong-letters-container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  text-align: right;
}
.word {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.letter {
  border-bottom: 3px solid #2980b9;
  display: inline-flex;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
  height: 50px;
  width: 20px;
}
</style>

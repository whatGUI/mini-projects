<template>
  <div class="memory-cards">
    <button class="clear btn" @click="deleteCards">
      <font-awesome-icon icon="trash" />
      清空卡片
    </button>
    <h1>
      记忆卡片
      <button class="btn btn-small" @click="showAdd = true">
        <font-awesome-icon icon="plus" />
        添加卡片
      </button>
    </h1>

    <div class="cards">
      <div
        class="card"
        :class="{
          active: currentCard === index,
          right: currentCard < index,
          left: currentCard > index,
          'show-answer': showAnswer,
        }"
        v-for="(item, index) in cards"
        :key="index"
        @click="showAnswer = !showAnswer"
      >
        <div class="inner-card">
          <div class="inner-card-front">
            <p>{{ item.question }}</p>
            <div class="flip-icon">
              <font-awesome-icon icon="sync-alt" />
              Flip
            </div>
          </div>
          <div class="inner-card-back">
            <p>{{ item.answer }}</p>
            <div class="flip-icon">
              <font-awesome-icon icon="sync-alt" />
              Flip
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="navigation">
      <button class="nav-button" @click="prev">
        <font-awesome-icon icon="arrow-left" />
      </button>
      <div>{{ getCurrentCard }}/{{ cards.length }}</div>
      <button class="nav-button" @click="next">
        <font-awesome-icon icon="arrow-right" />
      </button>
    </div>

    <div class="add-container" :class="{ show: showAdd }">
      <h1>
        添加新的卡片<button
          class="btn btn-small btn-ghost"
          @click="showAdd = false"
        >
          <font-awesome-icon icon="times" />
        </button>
      </h1>
      <div class="form-group">
        <label for="question">问题</label>
        <textarea
          id="question"
          placeholder="输入问题..."
          v-model.trim="question"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="answer">答案</label>
        <textarea
          id="answer"
          placeholder="输入答案..."
          v-model.trim="answer"
        ></textarea>
      </div>

      <button class="btn" @click="addCard">添加</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemoryCards",
  data() {
    return {
      cards: [],
      question: "",
      answer: "",
      showAdd: false,
      currentCard: 0,
      isActive: {},
      showAnswer: false,
    };
  },
  mounted() {
    if (localStorage.getItem("cards")) {
      this.cards = JSON.parse(localStorage.getItem("cards"));
    }
  },
  methods: {
    // 点击添加卡片按钮
    addCard() {
      if (this.question && this.answer) {
        this.cards.push({ question: this.question, answer: this.answer });
        this.saveLocalStorage();
        this.showAdd = false;
        this.question = "";
        this.answer = "";
      }
    },
    // 保存卡片数据到localStorage
    saveLocalStorage() {
      const data = JSON.stringify(this.cards);
      localStorage.setItem("cards", data);
    },
    // 删除卡片
    deleteCards() {
      this.cards = [];
      localStorage.removeItem("cards");
      this.currentCard = 0
    },
    // 前一张卡片
    prev() {
      this.showAnswer = false;
      this.currentCard--;
      if (this.currentCard < 0) {
        this.currentCard = this.cards.length - 1;
      }
    },
    // 后一张卡片
    next() {
      this.showAnswer = false;
      this.currentCard++;
      if (this.currentCard > this.cards.length - 1) {
        this.currentCard = 0;
      }
    },
  },
  computed: {
    getCurrentCard() {
      if (this.cards.length === 0) {
        return 0;
      } else {
        return this.currentCard + 1;
      }
    },
  },
};
</script>

<style scoped>
.memory-cards {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
h1 {
  position: relative;
}

h1 button {
  position: absolute;
  right: 0;
  transform: translate(120%, -50%);
  z-index: 2;
}
.btn {
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px 15px;
}
.btn-small {
  font-size: 12px;
  padding: 5px 10px;
}

.btn-ghost {
  border: 0;
  background-color: transparent;
}

.clear {
  position: absolute;
  bottom: 30px;
  left: 30px;
}
.cards {
  perspective: 1000px;
  position: relative;
  height: 300px;
  width: 500px;
  max-width: 100%;
}
.card {
  position: absolute;
  opacity: 0;
  font-size: 1.5em;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: translateX(50%) rotateY(-10deg);
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.card.active {
  cursor: pointer;
  opacity: 1;
  z-index: 10;
  transform: translateX(0) rotateY(0deg);
}

.card.left {
  transform: translateX(-50%) rotateY(10deg);
}

.inner-card {
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}

.card.show-answer .inner-card {
  transform: rotateX(180deg);
}

.inner-card-front,
.inner-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #fff;
}

.inner-card-front {
  transform: rotateX(0deg);
  z-index: 2;
}

.inner-card-back {
  transform: rotateX(180deg);
}

.flip-icon {
  position: absolute;
  user-select: none;
  top: 10px;
  right: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
  z-index: 20;
}
.navigation {
  display: flex;
  margin: 20px 0;
}

.navigation .nav-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
}

.navigation p {
  margin: 0 25px;
}
.add-container {
  opacity: 0;
  z-index: -1;
  background-color: #f0f0f0;
  border-top: 2px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  transition: 0.3s ease;
}

.add-container.show {
  opacity: 1;
  z-index: 2;
}

/* .add-container h3 {
  margin: 10px 0;
} */

.form-group label {
  display: block;
  margin: 20px 0 10px;
}

.form-group textarea {
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 16px;
  padding: 12px;
  min-width: 500px;
  max-width: 100%;
}
</style>

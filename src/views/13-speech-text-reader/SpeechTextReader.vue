<template>
  <div class="speech-text-reader">
    <div class="container">
      <h1>文字转语音阅读器</h1>
      <button class="btn btn-toggle" @click="showBox = !showBox">
        自定义阅读文字
      </button>

      <div class="main">
        <div
          v-for="(item, index) in data"
          :key="index"
          @click="imgClick(item.text)"
        >
          <img :src="getImgSrc(item.image)" :alt="item.text" />
          <p>{{ item.text }}</p>
        </div>
      </div>

      <div class="text-box" :class="{ show: showBox }">
        <div class="close" @click="showBox = false">
          <font-awesome-icon :icon="['fas','times']"/>
        </div>
        <h3>选择语言</h3>

        <select name="" id="" @change="setVoice">
          <option
            :value="item.name"
            v-for="(item, index) in voices"
            :key="index"
          >
            {{ item.name }} {{ item.lang }}
          </option>
        </select>

        <textarea
          id="text"
          placeholder="输入文字以阅读..."
          v-model.trim="text"
        ></textarea>

        <div class="loading" v-show="showLoading">
          <font-awesome-icon spin icon="spinner" />
          <p>加载中</p>
        </div>

        <button class="btn" @click="readText">阅读文字</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeechTextReader",
  data() {
    return {
      data: [
        {
          image: "food.jpg",
          text: "I'm Hungry",
        },
        {
          image: "tired.jpg",
          text: "I'm Tired",
        },
        {
          image: "outside.jpg",
          text: "I Want To Go Outside",
        },
        {
          image: "home.jpg",
          text: "I Want To Go Home",
        },
        {
          image: "school.jpg",
          text: "I Want To Go To School",
        },
        {
          image: "grandma.jpg",
          text: "I Want To Go To Grandmas",
        },
      ],
      message: new SpeechSynthesisUtterance(),
      voices: [],
      showBox: false,
      text: "",
      showLoading: false,
    };
  },
  mounted() {
    speechSynthesis.addEventListener("voiceschanged", this.getVoices);
    // edge浏览器的在线语音引擎可能需要使用boundary边界事件，来显示及隐藏加载图标
    // this.message.addEventListener("boundary", () => {
    //   this.showLoading = false;
    // });

    // 语音加载完成，隐藏loading
    this.message.addEventListener("start", () => {
      this.showLoading = false;
    });
  },
  methods: {
    getImgSrc(srcStr) {
      return require(`@/assets/img/13-speech-text-reader/${srcStr}`);
    },
    getVoices() {
      // 由于浏览器是异步执行getVoices()的，故使用监听voiceschanged事件来更新语音引擎的列表
      this.voices = speechSynthesis.getVoices();
    },
    // 设置文字
    setTextMessage(text) {
      this.message.text = text;
    },
    speakText() {
      // 取消转语音的所有队列，防止上一个语音加载不出来导致失效
      speechSynthesis.cancel();
      speechSynthesis.speak(this.message);
    },
    // 由下拉菜单来设置语音引擎
    setVoice(e) {
      this.message.voice = this.voices.find(
        (voice) => voice.name === e.target.value
      );
    },

    imgClick(text) {
      this.setTextMessage(text);
      this.speakText();
    },
    loading() {
      if (this.text) {
        this.showLoading = true;
      }
    },
    readText() {
      this.setTextMessage(this.text);
      this.speakText();
      this.loading();
    },
  },
};
</script>

<style scoped>
.speec-text-reader {
  background: #ffefea;
  min-height: 100vh;
  margin: 0;
}
.container {
  margin: auto;
  padding: 20px;
}
h1 {
  text-align: center;
}
.btn-toggle {
  display: block;
  margin: auto;
  margin-bottom: 20px;
}
.btn {
  cursor: pointer;
  background-color: darksalmon;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  padding: 8px;
}
.main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
@media (max-width: 760px) {
  .main {
    grid-template-columns: repeat(2, 1fr);
  }
}
.main > div {
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.2s ease-out;
}
.main img {
  width: 100%;
  object-fit: cover;
  height: 200px;
}
.main p {
  background-color: darksalmon;
  color: #fff;
  font-size: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
  padding: 10px;
  text-align: center;
  height: 100%;
}

.text-box {
  width: 610px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -800px);
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  transition: all 1s ease-in-out;
}
@media (max-width: 900px) {
  .text-box {
    width: 70%;
  }
}
.text-box.show {
  transform: translate(-50%, 0);
}
.text-box .close {
  float: right;
  text-align: right;
  cursor: pointer;
}
.text-box select {
  background-color: darksalmon;
  border: 0;
  color: #fff;
  font-size: 12px;
  height: 30px;
  width: 100%;
}
.text-box textarea {
  border: 1px #dadada solid;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
  margin: 15px 0;
  width: 100%;
  height: 150px;
}
.text-box .btn {
  width: 100%;
}
.loading {
  top: 0;
  text-align: center;
}
.loading p {
  font-size: 12px;
  margin: 5px;
}

.spinner {
  width: 30px;
  height: 30px;
}
</style>

<template>
  <div class="lyrics-search">
    <header>
      <h1>歌词搜索</h1>
      <small>仅限英文</small>
      <form @submit.prevent>
        <input
          type="text"
          v-model.trim="searchStr"
          placeholder="输入艺人或歌曲名..."
        />
        <button @click="searchSongs">搜索</button>
      </form>
    </header>

    <div class="container">
      <div class="lyrics" v-if="showLyrics">
        <h2>
          <strong>{{ lyrics.artist }}</strong> - {{ lyrics.title }}
        </h2>
        <span>{{ lyrics.lyrics }}</span>
        <button class="btn" @click="back">返回</button>
      </div>

      <ul v-else>
        <li v-for="(item, index) in resultList[currentPage]" :key="index">
          <span
            ><strong>{{ item.artist.name }}</strong> - {{ item.title }}</span
          >
          <button class="btn" @click="getLyrics(item.artist.name, item.title)">
            查看歌词
          </button>
        </li>
      </ul>
    </div>

    <div class="container centered" v-show="showNavBtn">
      <button class="btn" @click="prevBtnClick" v-show="currentPage > 0">
        上一页
      </button>
      <button class="btn" @click="nextBtnClick" v-show="resultList[currentPage+1]!==-1">
        下一页
      </button>
    </div>

    <notification class="notification" ref="noti" />
  </div>
</template>

<script>
import Notification from "../../components/common/Notification.vue";
export default {
  name: "LyricsSearch",
  data() {
    return {
      searchStr: "",
      resultList: [],
      currentPage: 0,
      apiURL: "https://api.lyrics.ovh",
      nextURL: "",
      showLyrics: false,
      showNavBtn: false,
      lyrics: {},
    };
  },
  components: { Notification },
  methods: {
    // 歌词搜索
    async searchSongs() {
      if (this.searchStr) {
        const res = await fetch(`${this.apiURL}/suggest/${this.searchStr}`);
        const data = await res.json();
        this.resultList = [];
        this.currentPage = 0;
        this.resultList.push(data.data);
        this.nextURL = data.next;

        this.showNavBtn = true;
      } else {
        alert("请输入搜索关键词");
      }
    },
    // 获取下一页搜索结果
    async getMoreSongs(url) {
      const res = await fetch(`https://thingproxy.freeboard.io/fetch/${url}`);
      const data = await res.json();
      if (data.next) {
        this.resultList.push(data.data);
        this.nextURL = data.next;
      } else {
        this.nextURL = "";
        throw "No more data";
      }
    },
    // 查看歌词
    async getLyrics(artist, songTitle) {
      const res = await fetch(`${this.apiURL}/v1/${artist}/${songTitle}`);
      const data = await res.json();

      this.lyrics.artist = artist;
      this.lyrics.title = songTitle;
      if (data.lyrics === "") {
        this.lyrics.lyrics = "暂无歌词";
      } else {
        this.lyrics.lyrics = data.lyrics;
      }

      this.showNavBtn = false;
      this.showLyrics = true;
    },
    // 上一页
    prevBtnClick() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    // 下一页
    async nextBtnClick() {
      if (this.currentPage < this.resultList.length - 1) {
        this.currentPage++;
      } else {
        if (this.nextURL) {
          try {
            await this.getMoreSongs(this.nextURL);
            this.currentPage++;
          } catch (error) {
            console.log(error);
            this.$refs.noti.show("已经没有更多数据了");
            this.resultList.push(-1)
          }
        } else {
          this.$refs.noti.show("已经没有更多数据了");
          this.resultList.push(-1)
        }
      }
    },
    // 返回搜索结果页
    back() {
      this.showLyrics = false;
      this.showNavBtn = true;
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}
button:active {
  transform: scale(0.95);
}
input:focus,
button:focus {
  outline: none;
}

header {
  background-image: url("https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  position: relative;
}
header::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
header * {
  z-index: 1;
}

header h1 {
  margin: 0 0 30px;
}
form {
  position: relative;
  width: 500px;
  max-width: 100%;
}

form input {
  border: 0;
  border-radius: 50px;
  font-size: 16px;
  padding: 15px 30px;
  width: 100%;
}

form button {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #e056fd;
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 16px;
  padding: 13px 30px;
}
.btn {
  background-color: #8d56fd;
  border: 0;
  border-radius: 10px;
  color: #fff;
  padding: 4px 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.container {
  margin: 30px auto;
  max-width: 100%;
  width: 700px;
}
.container h2 {
  font-weight: 300;
}
.container p {
  text-align: center;
}
.centered {
  display: flex;
  justify-content: center;
}
.centered button {
  transform: scale(1.3);
  margin: 15px;
}
.lyrics {
  position: relative;
}
.lyrics span {
  white-space: pre-wrap;
}
.lyrics button {
  position: absolute;
  top: 0;
  right: 0;
}
.notification {
  margin: 0 auto;
  right: 0;
  left: 0;
  background-color: #e056fd;
  color: #fff;
}
</style>

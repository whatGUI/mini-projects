<template>
  <div class="infinite-scroll-blog">
    <h1>博客</h1>
    <h3>下拉加载更多帖子</h3>

    <div class="filter-container">
      <input
        type="text"
        class="filter"
        placeholder="关键词搜索..."
        @input="filterPosts"
      />
    </div>

    <div class="posts-container">
      <div
        class="post"
        v-for="item in postList"
        :key="item.id"
        v-show="item.show"
      >
        <div class="number">{{ item.id }}</div>
        <div class="post-info">
          <h2 class="post-title">{{ item.title }}</h2>
          <p class="post-body">{{ item.body }}</p>
        </div>
      </div>
    </div>

    <div class="loader" :class="{ show: showLoading }">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfiniteScrollBlog",
  data() {
    return {
      limit: 5,
      page: 1,
      postList: [],
      showLoading: false,
      isLoading: false,
    };
  },
  mounted() {
    // 初始化帖子
    this.getPosts().then(() => {
      window.addEventListener("scroll", this.loadMore);
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.loadMore);
  },
  methods: {
    // 请求post数据
    async getPosts() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`
      );
      const data = await res.json();
      data.forEach((post) => {
        post.show = true;
      });
      this.postList.push(...data);
      this.page++;
    },
    // 载入更多post
    async loadMore() {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.showLoading = true;
        // 节流
        if (this.isLoading === false) {
          this.isLoading = true;

          await this.getPosts();
          this.showLoading = false;

          this.isLoading = false;
        }
      }
    },
    filterPosts(e) {
      const term = e.target.value;
      this.postList.forEach((post) => {
        if (post.title.includes(term) || post.body.includes(term)) {
          post.show = true;
        } else {
          post.show = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.infinite-scroll-blog {
  background-color: #296ca8;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding-bottom: 100px;
}
h1 {
  margin-bottom: 0;
  text-align: center;
}
.filter-container {
  margin-top: 20px;
  width: 80vw;
  max-width: 800px;
}
.filter {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}
.post {
  position: relative;
  background-color: #4992d3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 20px;
  margin: 40px 0;
  display: flex;
  width: 80vw;
  max-width: 800px;
}
.post .post-title {
  margin: 0;
}

.post .post-body {
  margin: 15px 0 0;
  line-height: 1.3;
}

.post .post-info {
  margin-left: 20px;
}

.post .number {
  position: absolute;
  top: -15px;
  left: -15px;
  font-size: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #296ca8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
}
.loader {
  opacity: 0;
  display: flex;
  position: fixed;
  bottom: 50px;
  transition: opacity 0.3s ease-in;
}

.loader.show {
  opacity: 1;
}
.circle {
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px;
  animation: bounce 0.5s ease-in infinite;
}

.circle:nth-of-type(2) {
  animation-delay: 0.1s;
}

.circle:nth-of-type(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>

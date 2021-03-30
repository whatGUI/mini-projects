<template>
  <div class="Home">
    <nav class="nav">
      <div class="vue">Vue.js</div>
      <div class="source-code">
        <a
          href="https://github.com/whatGUI/mini-projects"
          target="_blank"
          rel="noopener"
          ><font-awesome-icon :icon="['fab', 'github']" /> Source Code</a
        >
      </div>
    </nav>
    <main class="main">
      <div class="left">
        <img src="@/assets/img/home/logo.png" alt="logo" />
      </div>
      <div class="right">
        <h1>20+项目合集(SPA页面)<br />采用Vue.js重写</h1>
        <div class="icons">
          <font-awesome-icon
            :icon="['fab', 'html5']"
            size="3x"
            style="color: #e54d26"
          />
          <font-awesome-icon :icon="['fas', 'plus']" />
          <font-awesome-icon
            :icon="['fab', 'css3-alt']"
            size="3x"
            style="color: #fbe13f"
          />
          <font-awesome-icon :icon="['fas', 'plus']" />
          <font-awesome-icon
            :icon="['fab', 'js']"
            size="3x"
            style="color: #006cbf"
          />
          <font-awesome-icon :icon="['fas', 'plus']" />
          <font-awesome-icon
            :icon="['fab', 'vuejs']"
            size="3x"
            style="color: #4fc08d"
          />
        </div>
      </div>
    </main>
    <div class="projects">
      <div
        class="project-item"
        v-for="(item, index) in routerLinkList"
        :key="index"
      >
        <router-link class="routerLink" :to="item">
          <img :src="getImgSrc(item, index)" loading="lazy" />
        </router-link>
      </div>
    </div>
    <footer class="footer">
      <p>Acknowledgment:</p>
      <p>
        Original project
        <a
          href="https://github.com/bradtraversy/vanillawebprojects"
          target="_blank"
          rel="noopener"
          >Vanilla Web Projects</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      routerLinkList: [],
    };
  },
  mounted() {
    this.getLinkList();
    // console.log(this.routerLinkList);
  },
  methods: {
    getLinkList() {
      const routes = this.$router.options.routes;
      this.routerLinkList = routes.map((r) => r.path);
      this.routerLinkList.splice(0, 1);
    },
    getImgSrc(str, index) {
      const fileName = str.slice(4);
      return require(`@/assets/img/home/thumbnails-${
        index + 1
      }-${fileName}.png`);
    },
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0 50px;
}
.nav .vue {
  font-size: 1.5em;
  line-height: 40px;
  color: #273849;
  font-weight: 500;
}
.nav .source-code a {
  color: #666;
  text-decoration: none;
  outline: none;
}
.nav .source-code:hover * {
  color: #42b983;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  width: 100%;
  padding: 35px 0;
}
.main h1 {
  font-weight: 400;
  color: #273849;
  font-size: 3.2em;
}
.main .left {
  margin-right: 50px;
}
.main .left img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.main .right .icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  color: #273849;
}
.projects {
  padding: 30px 20px;
  width: 100%;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(4, 1fr);
  background-color: #f6f6f6;
}
@media (max-width: 960px) {
  .projects {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .projects {
    grid-template-columns: 1fr;
  }
}
.projects > div {
  position: relative;
  border-radius: 5px;
}
.projects img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-item {
  transition: transform ease-in 0.2s;
}
.project-item:hover {
  transform: scale(1.05);
  z-index: 2;
  box-shadow: 0px 0px 5px 3px #41b883;
}
.footer {
  padding: 30px 0;
  text-align: center;
  background-color: #475050;
  color: #fff;
}
.footer a {
  text-decoration-color: #fff;
  color: #fff;
  font-weight: bold;
}
</style>

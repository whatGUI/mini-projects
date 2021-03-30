<template>
  <div class="ModalMenuSlider" ref="ModalMenuSlider">
    <side-nav class="side-nav" :class="{ showNav: showSideNav }"/>

    <main :style="styleObj">
      <header>
        <button class="toggle" @click.stop="navToggle">
          <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        </button>
        <h1>登录页</h1>
        <p>加入我们随时随地获得最新信息！</p>
        <button class="cta-btn" @click.stop="showSignUpPage = true">
          注册
        </button>
      </header>

      <div class="container">
        <h2>Vue.js 是什么</h2>
        <p>
          Vue (读音 /vjuː/，类似于 view)
          是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
          被设计为可以自底向上逐层应用。Vue
          的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
          也完全能够为复杂的单页应用提供驱动。
        </p>
        <h2>Vue CLI</h2>
        <p>Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：</p>
        <ul>
          <li>通过 @vue/cli 实现的交互式的项目脚手架。</li>
          <li>
            通过 @vue/cli + @vue/cli-service-global 实现的零配置原型开发。
          </li>
          <li>
            一个运行时依赖 (@vue/cli-service)，该依赖：
            <ul>
              <li>可升级；</li>
              <li>基于 webpack 构建，并带有合理的默认配置；</li>
              <li>可以通过项目内的配置文件进行配置；</li>
              <li>可以通过插件进行扩展。</li>
            </ul>
          </li>
          <li>一个丰富的官方插件集合，集成了前端生态中最好的工具。</li>
          <li>一套完全图形化的创建和管理 Vue.js 项目的用户界面。</li>
        </ul>
        <p>
          Vue CLI 致力于将 Vue
          生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需
          eject。
        </p>
      </div>
    </main>

    <fade>
      <div
        class="landing-container"
        v-if="showSignUpPage"
      >
        <div class="sign-up-page" @click.stop>
          <button class="close-btn" @click.stop="showSignUpPage = false">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
          <div class="header"><h3>注册</h3></div>
          <sign-up-form class="signup-form" />
        </div>
      </div>
    </fade>
  </div>
</template>

<script>
import Fade from "../../components/animation/Fade.vue";
import SideNav from "./childComps/SideNav.vue";
import SignUpForm from "./childComps/SignUpForm.vue";

export default {
  name: "ModalMenuSlider",
  data() {
    return {
      showSideNav: false,
      styleObj: {},
      showSignUpPage: false,
    };
  },
  components: { SideNav, SignUpForm, Fade },
  methods: {
    // 导航栏开关
    navToggle(){
      if(this.showSideNav === false){
        this.styleObj.transform = "scale(" + this.getScale() + ")";
        this.showSideNav = true
      }
      else{
        this.styleObj = {};
        this.showSideNav = false
      }
    },
    // 获得主页面需要缩小的倍数
    getScale() {
      const totalWidth = this.$refs.ModalMenuSlider.clientWidth;
      return (totalWidth - 200) / totalWidth;
    },
  },
};
</script>

<style scoped>
.ModalMenuSlider {
  margin: 0;
  --primary-color: rgb(48, 51, 107);
  --secondary-color: #be2edd;
}

main {
  transition: transform 0.3s ease;
  transform-origin: top right;
}

.side-nav {
  transition: transform 0.3s ease;
}
.side-nav.showNav {
  transform: translateX(200px);
}

header {
  background-color: var(--primary-color);
  color: #fff;
  font-size: 130%;
  position: relative;
  padding: 40px 15px;
  text-align: center;
}
.toggle {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 20px;
  left: 20px;
}
button {
  background-color: var(--secondary-color);
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 8px 12px;
}
button:focus {
  outline: none;
}
header h1 {
  margin: 0;
}
header p {
  margin: 30px 0;
}
.cta-btn {
  padding: 12px 30px;
  font-size: 20px;
}

.container {
  padding: 15px;
  margin: 0 auto;
  max-width: 100%;
  width: 800px;
  line-height: 1.7;
}
.container ul {
  padding-left: 1.2em;
}

.landing-container {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.sign-up-page {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  width: 400px;
  z-index: 3;
}

.close-btn {
  background: transparent;
  font-size: 25px;
  position: absolute;
  top: 0;
  right: 0;
}
.header {
  background: var(--primary-color);
  color: #fff;
  padding: 15px;
}
.header h3 {
  margin: 0;
}
.signup-form {
  padding: 20px 20px 55px 20px;
}
</style>

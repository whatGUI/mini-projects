<template>
  <div class="SideNav">
    <div class="avatar">
      <img src="https://avatars.githubusercontent.com/u/16866586" alt="" />
    </div>

    <ul>
      <li><a href="#">主页</a></li>
      <li><a href="#">作品集</a></li>
      <li><a href="#">博客</a></li>
      <li><a href="#">联系我</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideNav",
};
</script>

<style scoped>
.SideNav {
  color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: -200px;
  height: 100vh;
  width: 200px;
  background-color: rgb(48, 51, 107);
  border-right: 2px solid rgba(200, 200, 200, 0.1);
  z-index: 1;
}
.SideNav ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.SideNav ul a {
  color: #ffffff;
  text-decoration: none;
}
.SideNav ul a:hover {
  text-decoration: underline;
}
.SideNav ul li {
  border-bottom: 2px solid rgba(200, 200, 200, 0.1);
  padding: 20px;
}
.SideNav ul li:first-child {
  border-top: 2px solid rgba(200, 200, 200, 0.1);
}
.avatar {
  padding: 30px 0;
  text-align: center;
}
.avatar img {
  height: 75px;
  width: 75px;
  border-radius: 50%;
}
</style>

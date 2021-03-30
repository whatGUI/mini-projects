<template>
  <div class="DomArrayMethods">
    <h1>账户余额</h1>
    <small>(数组方法实践)</small>
    <div class="container">
      <aside class="SideBar">
        <button @click="addUser">添加用户 👱‍♂️</button>
        <button @click="doubleMoney">金额加倍 💰</button>
        <button @click="filterUsers">查看百万用户 💵</button>
        <button @click="sortUsers">余额排序 ↓</button>
        <button @click="getTotal">总计 🧮</button>
      </aside>

      <main class="MainContent">
        <h2><strong class="left">账户名</strong>余额</h2>
        <div v-for="(item, index) in users" :key="index">
          <strong class="left">{{ item.name }}</strong>
          {{ item.money | moneyFormat }}
        </div>
        <div v-show="showTotal" class="total">
          总计：<strong>{{ total | moneyFormat }}</strong>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "DomArrayMethods",
  data() {
    return {
      users: [],
      total: 0,
      showTotal: false,
    };
  },
  mounted() {
    this.fetchUser(3);
  },
  methods: {
    // 请求用户信息
    fetchUser(n = 1) {
      for (let i = 0; i < n; i++) {
        fetch("https://randomuser.me/api")
          .then((res) => res.json())
          .then((data) => {
            const user = data.results[0];
            const newUser = {
              name: `${user.name.first} ${user.name.last}`,
              money: Math.floor(Math.random() * 1000000),
            };
            this.users.push(newUser);
          })
          .catch((err) => {
            if (err === "Failed to fetch") {
              this.fetchUser();
            }
          });
      }
    },
    // 添加更多账户
    addUser() {
      this.fetchUser();
      this.showTotal = false;
    },
    // 余额加倍
    doubleMoney() {
      this.users = this.users.map((user) => {
        return { ...user, money: user.money * 2 };
      });
      this.showTotal = false;
    },
    // 筛选出余额大于一百万的用户
    filterUsers() {
      this.users = this.users.filter((user) => user.money > 1000000);
      this.showTotal = false;
    },
    // 余额从大到小排序
    sortUsers() {
      this.users.sort((a, b) => b.money - a.money);
      this.showTotal = false;
    },
    // 余额总计
    getTotal() {
      this.total = this.users.reduce(
        (acc, current) => (acc += current.money),
        0
      );
      this.showTotal = true;
    },
  },
  filters: {
    // Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    moneyFormat(number) {
      return (
        "￥" + (number?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") ?? 0)
      );
    },
  },
};
</script>

<style scoped>
.DomArrayMethods {
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
h1 {
  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.container {
  display: flex;
  padding: 20px;
  margin: 0 auto;
  max-width: 100%;
  width: 800px;
}
.SideBar {
  padding: 10px 20px;
  width: 250px;
  border-right: 1px solid #111;
}
.SideBar > button {
  cursor: pointer;
  background-color: #fff;
  border: solid 1px #111;
  border-radius: 5px;
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
}
.MainContent {
  flex: 1;
  padding: 10px 20px;
}
.MainContent h2{
    border-bottom: 1px solid #111;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  margin: 0 0 20px;
}
.MainContent div{
    display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 10px;
}
.total {
  border-top: 1px solid #111;
  padding-top: 10px;
}
</style>

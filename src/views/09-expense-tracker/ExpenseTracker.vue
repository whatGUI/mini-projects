<template>
  <div class="expense-tracker">
    <h2>记账小助手</h2>

    <div class="container">
      <h4>你的余额</h4>
      <h1>{{ total | moneyFixed }}</h1>
      <div class="inc-exp-container">
        <div>
          <h4>收入</h4>
          <p class="money income">{{ totalIncome | moneyFixed }}</p>
        </div>
        <div>
          <h4>支出</h4>
          <p class="money expense">{{ totalExpense | moneyFixed }}</p>
        </div>
      </div>

      <h3>所有记录</h3>
      <ul class="list">
        <li
          v-for="(item, index) in transactions"
          :key="index"
          :class="{ plus: item.amount > 0, minus: item.amount < 0 }"
        >
          <div>{{ item.text }}</div>
          <div>{{ item.amount | moneyFixed }}</div>
          <button class="delete-btn" @click="removeTransaction(index)">
            <font-awesome-icon :icon="['fas','times']"/>
          </button>
        </li>
      </ul>

      <h3>添加新的记录</h3>
      <form @submit.prevent="addTransaction">
        <label for="text">名称</label>
        <input
          type="text"
          id="text"
          placeholder="输入名称..."
          v-model.trim="text"
        />
        <label for="amount">金额 <small>（正数：收入，负数：支出）</small></label>
        <input
          type="number"
          id="amount"
          step="0.01"
          placeholder="输入金额..."
          v-model.trim="amount"
        />
        <button type="submit" class="btn">添加记录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpenseTracker",
  data() {
    return {
      total: 0,
      totalIncome: 0,
      totalExpense: 0,
      text: "",
      amount: "",
      transactions: [],
    };
  },
  mounted() {
    this.getLocalStorage();
  },
  methods: {
    addTransaction() {
      if (this.text !== "" && this.amount !== "") {
        const transaction = {
          id: this.generateID(),
          text: this.text,
          amount: +this.amount,
        };
        this.transactions.push(transaction);
        this.updateLocalStorage();
        this.updateTotal();
        this.text = "";
        this.amount = "";
      } else {
        alert("请添加名称和金额");
      }
    },
    removeTransaction(index) {
      this.transactions.splice(index, 1);
      this.updateLocalStorage();
      this.updateTotal();
    },
    generateID() {
      return Math.floor(Math.random() * 100000000);
    },
    updateLocalStorage() {
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },
    updateTotal() {
      let income = 0,
        expense = 0;
      this.transactions?.forEach((item) => {
        const amount = item.amount;
        if (amount > 0) {
          income += amount;
        }
        if (amount < 0) {
          expense += amount;
        }
      });
      this.total = income + expense;
      this.totalIncome = income;
      this.totalExpense = expense;
    },
    getLocalStorage() {
      if (localStorage.getItem("transactions")) {
        try {
          this.transactions = JSON.parse(localStorage.getItem("transactions"));
          this.updateTotal();
        } catch (error) {
          localStorage.removeItem("transactions");
        }
      }
    },
  },
  filters: {
    moneyFixed(n) {
      return "￥" + n.toFixed(2);
    },
  },
};
</script>

<style scoped>
.expense-tracker {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;

  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.container {
  margin: 30px auto;
  width: 350px;
}
h1 {
  letter-spacing: 1px;
  margin: 0;
}

h3 {
  border-bottom: 1px solid #bbb;
  padding-bottom: 10px;
  margin: 40px 0 10px;
}

h4 {
  margin: 0;
}
.inc-exp-container {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.inc-exp-container > div {
  flex: 1;
  text-align: center;
}

.inc-exp-container > div:first-of-type {
  border-right: 1px solid #dedede;
}
.money {
  font-size: 20px;
  letter-spacing: 1px;
  margin: 5px 0;
}
.money.income {
  color: #2ecc71;
}
.money.expense {
  color: #c0392b;
}
label {
  display: inline-block;
  margin: 10px 0;
}
input[type="text"],
input[type="number"] {
  border: 1px solid #dedede;
  border-radius: 2px;
  display: block;
  font-size: 16px;
  padding: 10px;
  width: 100%;
}
.btn {
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 100%;
}

.btn:focus,
.delete-btn:focus {
  outline: 0;
}
.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}

.list li {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
}
.list li.plus {
  border-right: 5px solid #2ecc71;
}

.list li.minus {
  border-right: 5px solid #c0392b;
}
.delete-btn {
  cursor: pointer;
  background-color: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.list li:hover .delete-btn {
  opacity: 1;
}
</style>
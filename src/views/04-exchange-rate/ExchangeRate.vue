<template>
  <div class="exchange-rate">
    <img src="@/assets/img/04-exchange-rate/money.png" class="money-img" />
    <h1>汇率计算器</h1>
    <p>选择货币种类和金额来计算汇率</p>

    <div class="container">
      <div class="currency">
        <select id="currency-1" v-model="select1" @change="change1">
          <option
            :value="item"
            v-for="(item, index) in currencyCode"
            :key="index"
          >
            {{ item }}
          </option>
        </select>
        <input
          type="number"
          min="0"
          placeholder="0"
          v-model.number="num1"
          @input="change1"
        />
      </div>

      <div class="swap-rate-container">
        <button class="btn" @click="swapBtn">切换</button>
        <div class="rate">1 {{ select1 }} = {{ rateInfo }} {{ select2 }}</div>
      </div>

      <div class="currency">
        <select id="currency-2" v-model="select2" @change="change2">
          <option
            :value="item"
            v-for="(item, index) in currencyCode"
            :key="index"
          >
            {{ item }}
          </option>
        </select>
        <input
          type="number"
          min="0"
          placeholder="0"
          v-model.number="num2"
          @input="change2"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExchangeRate",
  data() {
    return {
      rateData: {},
      select1: "CNY",
      select2: "USD",
      num1: 1,
      num2: 0,
      currencyCode: [],
    };
  },
  computed: {
    rateInfo() {
      return (
        this.rateData[this.select2] / this.rateData[this.select1]
      ).toFixed(6);
    },
  },
  methods: {
    change1() {
      const rate = this.rateData[this.select2] / this.rateData[this.select1];
      this.num2 = (this.num1 * rate).toFixed(2);
    },
    change2() {
      const rate = this.rateData[this.select1] / this.rateData[this.select2];
      this.num1 = (this.num2 * rate).toFixed(2);
    },
    swapBtn() {
      [this.select1, this.select2] = [this.select2, this.select1];
      this.change1();
    },
  },
  mounted() {
    fetch(`https://api.exchangerate-api.com/v4/latest/CNY`)
      .then((response) => response.json())
      .then((json) => {
        this.rateData = json.rates;
        this.currencyCode = Object.keys(json.rates);
        this.num2 = this.rateData.USD;
      })
      .catch((err) => console.log("Fetch error: " + err.message));
  },
};
</script>

<style scoped>
.exchange-rate {
  --primary-color: #5fbaa7;

  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
}
.money-img {
  width: 150px;
}
h1 {
  color: var(--primary-color);
}
p {
  text-align: center;
}

.currency {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.currency select {
  padding: 10px 20px 10px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #dedede;
  font-size: 16px;
  background: transparent;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-position: right 10px top 50%, 0, 0;
  background-size: 12px auto, 100%;
  background-repeat: no-repeat;
}
.currency input {
  border: 0;
  background: transparent;
  font-size: 30px;
  text-align: right;
}

.swap-rate-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  color: #fff;
  background: var(--primary-color);
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px 12px;
}
.rate {
  color: var(--primary-color);
  font-size: 14px;
  padding: 0 10px;
}
select:focus,
input:focus,
button:focus {
  outline: 0;
}

@media (max-width: 600px) {
  .currency input {
    width: 200px;
  }
}
</style>

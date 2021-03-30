## Original README
### Exchange Rate

Select countries to get the exchange rate for a specific amount

### Project Specifications

- Display UI with 2 select lists for countries and 2 inputs for amounts
- Fetch exchange rates from API (https://api.exchangerate-api.com)
- Display the values for both countries
- Update values on amount change
- Swap country rates

----
## 我的记录(My Logs)

### 遇到的问题
- 每次计算都要进行一次网络请求汇率，而实际上汇率变化没有那么频繁
- 不能在第二个文本框中直接输入数字

### 修改
- 只在加载页面时进行一次汇率请求，减少网络请求
- 第二个文本框也添加了计算功能
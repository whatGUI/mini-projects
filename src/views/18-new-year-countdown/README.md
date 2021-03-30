## Original README

### New Year Countdown

Landing page that counts down from the current date to the next new year

### Project Specifications

- Create landing page with HTML/CSS
- Calculate the days, hours, mins and seconds to the new year
- Insert values into the DOM
- Show a spinner right before loading the countdown
- Show the coming year in the background

----
## 我的记录(My Logs)

### 修改：
- 创建`newYearTime`的Date实例时分别提供日期和时间的参数，原因是：根据[MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#several_ways_to_create_a_date_object)，由于浏览器间的差异性，不推荐使用时间戳字符串
- 使用vue过滤器filter，将小于10的数字显示为`0x`的格式
- 对中文标题h1添加了额外的字间距`letter-spacing`
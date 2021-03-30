## Original README

### Sortable List

Display a scrambled list that can be sorted with drag and drop

### Project Specifications

- Create an ordered list (Top 10 richest people)
- Scramble list items randomly
- Allow user to drag and drop an item to a different position
- Button to check if items are in correct order
- Show green for correct order and red for wrong order

----
## 我的记录(My Logs)

### 遇到的问题
- 遇到了一个在Chrome和Edge浏览器下出现的bug（在Firefox下并没有发现），即在拖拽开始时会由一个非点击的对象发出一个drag enter事件，导致突出显示的视觉效果出现闪烁。  
在未使用Vue.js的情况下编写了一个验证用demo页面，从而确定是浏览器的bug。之后经过多次测试发现，拖拽区域在可拖拽对象的左侧位置处正常，在偏向右侧的区域上才会出现这样的bug现象。  
解决方法：等待Chrome浏览器修复此bug。

### 修改
- 采用Fisher-Yates shuffle洗牌算法替代源码中的sort排序法，提高打乱数组的效率
- 通过删除dragLeave，修复了拖拽过程中突出显示（drag over）的视觉效果消失的问题
## Original README

### Meal Finder App

Search and generate random meals from the [themealdb.com](https://www.themealdb.com) API

### Project Specifications

- Display UI with form to search and button to generate
- Connect to API and get meals
- Display meals in DOM with image and hover effect
- Click on meal and see the details
- Click on generate button and fetch & display a random meal

----
## 我的记录(My Logs)

### 遇到的问题
- 点击搜索结果后不会自动跳转到目标位置，容易让人误以为没有点击或加载

### 修改
- 点击搜索结果后自动滚动到菜谱所在的位置
- 添加了正在搜索获得菜谱的提示信息
- 存储了搜索结果的相关内容，在点击搜索结果时不再向服务器发送请求，减少了不必要的网络请求
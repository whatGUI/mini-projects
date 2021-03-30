## Original README

### Infinite Scrolling & Filter

Display blog posts from [jsonplaceholder](https://jsonplaceholder.typicode.com) and add infinite scroll to fetch posts and also add filter box

### Project Specifications

- Create UI & custom CSS loader animation
- Fetch initial posts from API and display
- Scroll down, show loader and fetch next set of posts
- Add filtering for fetched posts

----
## 我的记录(My Logs)

### 遇到的问题
- 下拉加载新内容时，可能会由于抖动一次加载很多页

### 修改
- 对下拉到底部的判断增加了节流，不会再一次加载很多页
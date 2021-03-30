## Original README

### LyricsSearch App

Find songs, artists and lyrics using the [lyrics.ovh](https://lyrics.ovh) API

### Project Specifications

- Display UI with song/artist input
- Fetch songs/artists and put in DOM
- Add pagination
- Add get lyrics functionality and display in DOM

----
## 我的记录(My Logs)

### 遇到的问题
- 原页面中的CORS处理方法失效，无法查看歌词

### 修改
- 改用了 [thingproxy](https://thingproxy.freeboard.io) 进行CORS的处理
- 添加了查看歌词页面的返回按钮
- 缓存每一页的搜索结果，添加了上一页按钮，便于查看，且减少对服务器的请求
- 没有下一页搜索结果时，自动隐藏下一页按钮
## Original README

### Music Player

Create beautiful UI to play music stored in the "music folder" using the HTML5 audio API

### Project Specifications

- Create UI for music player including spinning image and song detail popup
- Add play and pause functionality
- Switch songs
- Progress bar

----
## 我的记录(My Logs)

### 遇到的问题
- 动态切换audio标签的src属性后，不能正确的播放更改后的音频

### 修改
- 切换上一首或下一首歌曲时，修改相应的src后使用`$nextTick()`进行`play()`的延迟回调，保证音频流加载完毕
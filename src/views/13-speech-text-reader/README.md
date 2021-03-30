## Original README

### Speech Text Reader

A text to speech app for non-verbal people. Pre-made buttons and custom text speech. This project uses the Web Speech API

### Project Specifications

- Create responsive UI (CSS Grid) with picture buttons
- Speaks the text when button clicked
- Drop down custom text to speech
- Speaks the text typed in
- Change voices and accents

----
## 我的记录(My Logs)

### 遇到的问题
- Chrome浏览器自带的在线语音API，由于网路问题可能会出现无法加载语音的情况，而Edge浏览器多会出现加载缓慢的情况

### 修改
- 在自定义文字转语音页添加一个loading动画以表示转换状态
- 由于浏览器是异步执行`speechSynthesis.getVoices()`的，使用voicechanged事件来触发语音引擎列表的更新，避免更新失败
- 转语音时，添加了一个`speechSynthesis.cancel()`的步骤，来清空语音队列，防止网络原因导致无法发出语音
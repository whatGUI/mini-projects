## Original README

### Relaxer App

A relaxing breathing app with a visual director to tell you when to breathe in, hold and breathe out

### Project Specifications

- Create circle and gradient circle with CSS
- Create and animate pointer (Small circle)
- Create grow and shrink animations
- Add JavaScript to create the breath animation effect

----
## 我的记录(My Logs)

### 修改
- 将放大与缩小动画grow与shrink合并定义为一个scale动画，减少了对相应元素的class的改动
- 将之前的用setInterval()触发各阶段动画的方式，改为了由animationstart和animationiteration两个事件进行触发
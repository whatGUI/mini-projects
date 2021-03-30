## Original README

### Breakout! Game

Game where you control a paddle with the arrow keys to bounce a ball up to break bricks. This app uses the HTML5 canvas element and API

### Project Specifications

- Draw elements on canvas
- Use canvas paths to draw shapes
- Add animation with requestAnimationFrame(cb)
- Move paddle on arrow key press
- Add collision detection
- Keep score
- Add rules button with slider

----
## 我的记录(My Logs)

### 修改：
- 随击中球拍的次数逐渐提高小球的速度，从而提高游戏难度；
- 所有砖块打完之后，不再重置游戏，分数累计不会清空
- canvas中的矩形部分改为fillRect方法，而没有采用绘制路径的办法，减少不必要的代码量
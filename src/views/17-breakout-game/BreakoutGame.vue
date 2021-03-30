<template>
  <div class="breakout-game">
    <h1>打砖块！</h1>
    <canvas ref="canvas">
      <p>画布加载失败，刷新或更新浏览器后重试</p>
    </canvas>

    <button class="rules-btn btn" @click="showRules=true">查看规则</button>

    <div class="rules" :class="{show:showRules===true}">
      <h2>怎么玩：</h2>
      <p>使用左右方向键移动球拍，将小球弹起并打破砖块。</p>
      <p>如果您错过小球，您的得分和砖块将重置。</p>
      <button class="btn" @click="showRules=false">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreakoutGame",
  data() {
    return {
      height: 600,
      width: 800,
      ctx: {},
      score: 0,
      brickRowCount: 9,
      brickColumnCount: 5,
      delay: 800,
      ball: {
        x: 0,
        y: 0,
        size: 10,
        speed: 4,
        dx: 4,
        dy: -4,
        visible: true,
      },
      paddle: {
        x: 0,
        y: 0,
        w: 80,
        h: 10,
        speed: 8,
        dx: 0,
        visible: true,
      },
      brickInfo: {
        w: 70,
        h: 20,
        padding: 10,
        offsetX: 45,
        offsetY: 60,
        visible: true,
      },
      bricks: [],
      showRules:false,
    };
  },
  mounted() {
    this.init();
    this.draw();
    this.update();
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyDown);
    document.removeEventListener("keyup", this.keyUp);
  },
  methods: {
    init() {
      // 初始化ball和paddle的位置数据
      this.ball.x = this.width / 2;
      this.ball.y = this.height / 2;
      this.paddle.x = this.width / 2 - 40;
      this.paddle.y = this.height - 20;
      // 初始化画布canvas
      this.$refs.canvas.height = this.height;
      this.$refs.canvas.width = this.width;
      this.ctx = this.$refs.canvas.getContext("2d");
      // 获得所有砖块的位置坐标
      for (let i = 0; i < this.brickRowCount; i++) {
        this.bricks[i] = [];
        for (let j = 0; j < this.brickColumnCount; j++) {
          const x =
            i * (this.brickInfo.w + this.brickInfo.padding) +
            this.brickInfo.offsetX;
          const y =
            j * (this.brickInfo.h + this.brickInfo.padding) +
            this.brickInfo.offsetY;
          this.bricks[i][j] = { x, y, ...this.brickInfo };
        }
      }
    },
    drawBricks() {
      this.bricks.forEach((column) => {
        column.forEach((brick) => {
          this.ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
          this.ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
        });
      });
    },
    drawBall() {
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.ball.visible ? "#0095dd" : "transparent";
      this.ctx.fill();
    },
    drawPaddle() {
      this.ctx.fillStyle = this.paddle.visible ? "#0095dd" : "transparent";
      this.ctx.fillRect(
        this.paddle.x,
        this.paddle.y,
        this.paddle.w,
        this.paddle.h
      );
    },
    drawScore() {
      this.ctx.font = "20px Arial";
      this.ctx.fillText(`Score:${this.score}`, this.width - 100, 30);
    },
    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawBricks();
      this.drawBall();
      this.drawPaddle();
      this.drawScore();
    },
    moveBall() {
      this.ball.x += this.ball.dx;
      this.ball.y += this.ball.dy;

      // 左右边的碰撞处理
      if (
        this.ball.x + this.ball.size > this.width ||
        this.ball.x - this.ball.size < 0
      ) {
        this.ball.dx = -this.ball.dx;
      }
      // 上边的碰撞处理
      if (this.ball.y - this.ball.size < 0) {
        this.ball.dy = -this.ball.dy;
      }
      // 下边的碰撞处理（游戏结束）
      if (this.ball.y + this.ball.size > this.height) {
        this.ball.dy = -this.ball.dy;
        this.ball.speed = 4;
        this.showAllBricks();
        this.score = 0;
      }
      // 与拍paddle的碰撞处理
      if (
        this.ball.y + this.ball.size > this.paddle.y &&
        this.ball.x - this.ball.size > this.paddle.x &&
        this.ball.x + this.ball.size < this.paddle.x + this.paddle.w
      ) {
        this.ball.dy = -this.ball.speed;
        // 随时间逐渐增加小球的速度
        this.ball.speed+=0.2;
      }
      // 与砖块bricks的碰撞处理
      this.bricks.forEach((column) => {
        column.forEach((brick) => {
          if (brick.visible) {
            if (
              this.ball.x - this.ball.size > brick.x &&
              this.ball.x + this.ball.size < brick.x + brick.w &&
              this.ball.y + this.ball.size > brick.y &&
              this.ball.y - this.ball.size < brick.y + brick.h
            ) {
              this.ball.dy = -this.ball.dy;
              brick.visible = false;
              this.increaseScore();
            }
          }
        });
      });
    },
    movePaddle() {
      this.paddle.x += this.paddle.dx;

      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }

      if (this.paddle.x + this.paddle.w > this.width) {
        this.paddle.x = this.width - this.paddle.w;
      }
    },
    showAllBricks() {
      this.bricks.forEach((column) => {
        column.forEach((brick) => {
          brick.visible = true;
        });
      });
    },
    update() {
      this.moveBall();
      this.movePaddle();

      this.draw();

      requestAnimationFrame(this.update);
    },
    increaseScore() {
      this.score++;

      if (this.score % (this.brickRowCount * this.brickColumnCount) === 0) {
        //延迟一段时间后重新开始
        setTimeout(() => {
          this.showAllBricks();
        }, this.delay);
      }
    },
    // Keydown event
    keyDown(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        this.paddle.dx = this.paddle.speed;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        this.paddle.dx = -this.paddle.speed;
      }
    },
    // Keyup event
    keyUp(e) {
      if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft"
      ) {
        this.paddle.dx = 0;
      }
    },
  },
};
</script>

<style scoped>
.breakout-game{
  background-color: #0095dd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
}
h1{
      font-size: 45px;
    color: #fff;
}

.btn{
  cursor: pointer;
    border: 0;
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border-radius: 5px;
}
.rules-btn{
position: absolute;
    top: 30px;
    left: 30px;
}

.rules {
    position: fixed;
    top: 0;
    left: 0;
    background: #333;
    color: #fff;
    min-height: 100vh;
    width: 400px;
    padding: 20px;
    line-height: 1.5;
    transform: translateX(-400px);
    transition: transform 0.5s ease-in-out;
}
.rules.show{
  transform: translateX(0);
}

canvas {
    background: #f0f0f0;
    display: block;
    border-radius: 5px;
}
</style>

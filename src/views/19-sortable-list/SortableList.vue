<template>
  <div class="sortable-list">
    <h1>财富排行榜</h1>
    <p>按财富排行把人名拖放到相应的位置上</p>
    <ul class="draggable-list">
      <li
        v-for="(item, index) in listItems"
        :key="index"
        :class="{
          over: dragEnterIndex === index,
          right: checkList[index] === true,
          wrong: checkList[index] === false,
        }"
        @dragover.prevent
        @dragenter="dragEnter(index)"
        @drop="dragDrop(index)"
      >
        <span class="number">{{ index + 1 }}</span>
        <div class="draggable" draggable="true" @dragstart="dragStart(index)">
          <p class="person-name">{{ item }}</p>
          <font-awesome-icon icon="grip-lines" />
        </div>
      </li>
    </ul>
    <button class="check-btn" @click="checkOrder">
      检查顺序
      <font-awesome-icon icon="paper-plane" />
    </button>
  </div>
</template>

<script>
export default {
  name: "SortableList",
  data() {
    return {
      richestPeople: [
        "杰夫·贝佐斯 (Jeff Bezos)",
        "比尔盖茨 (Bill Gates)",
        "沃伦·巴菲特 (Warren Buffett)",
        "伯纳德·阿诺特 (Bernard Arnault)",
        "卡洛斯·斯利姆·埃卢 (Carlos Slim Helu)",
        "阿曼西奥·奥特加 (Amancio Ortega)",
        "拉里·埃里森 (Larry Ellison)",
        "马克·扎克伯格 (Mark Zuckerberg)",
        "迈克尔·布隆伯格 (Michael Bloomberg)",
        "拉里·佩奇 (Larry Page)",
      ],
      listItems: [],
      dragStartIndex: null,
      dragEnterIndex: null,
      checkList: [],
    };
  },
  mounted() {
    this.createList();
  },
  methods: {
    // 初始化
    createList() {
      // 1.使用Fisher-Yates洗牌算法，打乱一个数组
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      this.listItems = shuffle([...this.richestPeople]);
      // -----------------------------------------------
      // 2.利用sort方法打乱数组,但是效率低，且存在一定的偏差,适用于简单场景
      // this.listItems = [...this.richestPeople].sort(() => 0.5 - Math.random());
    },
    // 拖拽开始时执行
    dragStart(index) {
      this.dragStartIndex = index;
    },
    // 拖拽进入可拖拽区域时执行
    dragEnter(index) {
      // console.log("drag enter:", index);
      this.dragEnterIndex = index;
    },
    // 拖拽停止时执行
    dragDrop(index) {
      this.listItems = this.swapItems(
        [...this.listItems],
        this.dragStartIndex,
        index
      );
      this.dragEnterIndex = undefined;
    },
    // 交换数组的两个元素
    swapItems(array, fromIndex, toIndex) {
      [array[fromIndex], array[toIndex]] = [array[toIndex], array[fromIndex]];
      return array;
    },
    // 检查顺序
    checkOrder() {
      this.checkList = [];
      this.listItems.forEach((item, index) => {
        if (item === this.richestPeople[index]) {
          this.checkList.push(true);
        } else {
          this.checkList.push(false);
        }
      });
    },
  },
};
</script>

<style scoped>
.sortable-list {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin: 0;
  --border-color: #e3e5e4;
  --background-color: #c3c7ca;
  --text-color: #34444f;
}
.draggable-list {
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0;
  list-style-type: none;
}
.draggable-list li:not(:last-of-type) {
  border-bottom: 1px solid var(--border-color);
}
.draggable-list li {
  background-color: #fff;
  display: flex;
  flex: 1;
}
.draggable-list .number {
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  height: 60px;
  width: 60px;
}
.draggable-list li.over .draggable {
  background-color: #eaeaea;
}

.draggable-list li.right .person-name {
  color: #3ae374;
}

.draggable-list li.wrong .person-name {
  color: #ff3838;
}
.draggable {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  flex: 1;
}
.draggable-list .person-name {
  margin: 0 20px 0 0;
}
.check-btn {
  background-color: var(--background-color);
  border: none;
  color: var(--text-color);
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
}
.check-btn:active {
  transform: scale(0.98);
}

.check-btn:focus {
  outline: none;
}
</style>

<template>
  <div class="movie-seat-booking">
    <div class="container">
      <h1>影院选座</h1>
      <div class="movie-container">
        <label for="movie">选择电影: </label>
        <select
          id="movie"
          v-model="selectedMovieIndex"
          @change="saveMovieIndex"
        >
          <option
            v-for="(item, index) in filmList"
            :key="item.id"
            :value="index"
          >
            {{ item.movie }}
          </option>
        </select>
      </div>

      <ul class="showcase">
        <li>
          <div class="seat"></div>
          <small>空</small>
        </li>
        <li>
          <div class="seat selected"></div>
          <small>已选中</small>
        </li>
        <li>
          <div class="seat occupied"></div>
          <small>已售出</small>
        </li>
      </ul>

      <div class="seats-container">
        <div class="screen"></div>
        <div class="allseats">
          <div class="seatrow" v-for="i in 6" :key="i">
            <div
              class="seat"
              v-for="j in 8"
              :class="seatClass(i, j)"
              :key="j"
              @click="selectSeat(i, j)"
            ></div>
          </div>
        </div>
      </div>
      <p>
        您已经选择了 <span>{{ count }}</span> 个座位，价格为
        <span>{{ getTotalPrice }}</span> 元
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSeatBooking",
  data() {
    return {
      filmList: [
        { id: 1, price: 10, movie: "复仇者联盟: 终局之战 (￥10)" },
        { id: 2, price: 12, movie: "小丑 (￥12)" },
        { id: 3, price: 8, movie: "玩具总动员4 (￥8)" },
        { id: 4, price: 9, movie: "狮子王 (￥9)" },
      ],
      selectedMovieIndex: 0,
      count: 0,
      seatStatus: [],
      occupiedSeats: [11, 12, 22, 23, 35, 36, 44, 45, 46],
    };
  },
  computed: {
    getTotalPrice() {
      return this.count * this.filmList[this.selectedMovieIndex].price;
    },
  },
  methods: {
    selectSeat(x, y) {
      let index = this.getIndexFromXY(x, y);
      if (this.seatStatus[index] === 0) {
        this.seatStatus.splice(index, 1, 1);
        this.count++;
      } else if (this.seatStatus[index] === 1) {
        this.seatStatus.splice(index, 1, 0);
        this.count--;
      }
      this.saveStatus();
    },
    initSeatStatus() {
      if (localStorage.getItem("selectedMovieIndex")) {
        this.selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
      }
      if (localStorage.getItem("seatStatus")) {
        this.seatStatus = JSON.parse(localStorage.getItem("seatStatus"));
        this.seatStatus.forEach((seat) => {
          if (seat === 1) this.count++;
        });
      } else {
        this.seatStatus.length = 48;
        this.seatStatus.fill(0);
        if (this.occupiedSeats) {
          this.occupiedSeats.forEach((index) => {
            this.seatStatus.splice(index, 1, 2);
          });
        }
      }
    },
    getIndexFromXY(x, y) {
      return 8 * (x - 1) + (y - 1);
    },
    seatClass(x, y) {
      let index = this.getIndexFromXY(x, y);
      if (this.seatStatus[index] === 1) {
        return "selected";
      } else if (this.seatStatus[index] === 2) {
        return "occupied";
      }
    },
    saveStatus() {
      localStorage.setItem("seatStatus", JSON.stringify(this.seatStatus));
    },
    saveMovieIndex() {
      localStorage.setItem("selectedMovieIndex", this.selectedMovieIndex);
    },
  },
  mounted() {
    this.initSeatStatus();
  },
};
</script>

<style scoped>
.movie-seat-booking {
  background-color: #242333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Lato", sans-serif;
  margin: 0;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.movie-container {
  margin: 20px 0;
}
.movie-container select {
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
  padding: 5px 15px 5px 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
.showcase {
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}
.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}
.showcase li small {
  margin-left: 2px;
}

.seats-container {
  perspective: 1000px;
  margin-bottom: 30px;
}
.screen {
  background-color: #fff;
  height: 70px;
  width: 100%;
  margin: 15px 0;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}

.seatrow {
  display: flex;
}
.seats-container .seat:nth-child(2) {
  margin-right: 18px;
}
.seats-container .seat:nth-last-child(2) {
  margin-left: 18px;
}
.seats-container .seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.seat {
  background-color: #444451;
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.seat.selected {
  background-color: #6feaf6;
}
.seat.occupied {
  background-color: #fff;
}
p {
  margin: 5px 0;
}
p span {
  color: #6feaf6;
}
</style>

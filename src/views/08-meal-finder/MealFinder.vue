<template>
  <div class="meal-finder">
    <div class="container">
      <h1>菜谱查询</h1>

      <div class="searchForm flex">
        <form @submit.prevent="searchMeal" class="flex">
          <input
            type="search"
            id="search"
            placeholder="搜索餐点或关键词（仅限英文）"
            v-model.trim="searchTerm"
          />
          <button type="submit" class="search-btn">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </form>
        <button @click="getRandomMeal" class="random-btn">
          <font-awesome-icon :icon="['fas', 'random']" />
        </button>
      </div>

      <div class="result-heading" v-show="showHeadingMeals">
        <h2 v-show="showHeading1">“{{ resultHeading }}”的搜索结果：</h2>
        <p v-show="showHeading2">没有搜索到相关的菜谱 请重试</p>
      </div>
      <div class="meals" v-show="showHeadingMeals">
        <div class="meal" v-for="(item, index) in meals" :key="index">
          <img :src="item.strMealThumb" :alt="item.strMeal" />
          <div @click="getMore(item)" class="meal-info">
            <h3>{{ item.strMeal }}</h3>
          </div>
        </div>
      </div>

      <div class="single-meal" v-show="showSingleMeal" ref="meal">
        <h1>{{ meal.strMeal }}</h1>
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <div class="single-meal-info">
          <p v-if="meal.strCategory">{{ meal.strCategory }}</p>
          <p v-if="meal.strArea">{{ meal.strArea }}</p>
        </div>
        <div class="main">
          <p>{{ meal.strInstructions }}</p>
          <h2>配料</h2>
          <ul>
            <li v-for="(item, index) in meal.ingredients" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <notification ref="notification" />
    </div>
  </div>
</template>

<script>
import Notification from "../../components/common/Notification.vue";
export default {
  name: "MealFinder",
  data() {
    return {
      searchTerm: "",
      resultHeading: "",
      showHeadingMeals: true,
      showSingleMeal: false,
      showHeading1: false,
      showHeading2: false,
      meals: [],
      meal: {},
    };
  },
  components: { Notification },
  methods: {
    // 搜索菜谱
    searchMeal() {
      const term = this.searchTerm;
      if (term) {
        this.showHeadingMeals = false;
        this.showSingleMeal = false;
        this.$refs.notification.show("正在搜索中 请稍后");
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
          .then((res) => res.json())
          .then((data) => {
            this.resultHeading = term;
            this.showHeadingMeals = true;
            if (data.meals === null) {
              this.showHeading2 = true;
            } else {
              this.showHeading1 = true;
              this.meals = data.meals;
            }
          });
      } else {
        alert("请输入一个关键词");
      }
    },
    // 获得一个随机菜谱
    getRandomMeal() {
      this.showHeadingMeals = false;
      this.showSingleMeal = false;
      this.$refs.notification.show("正在获取数据 请稍后");
      fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
          this.getMore(data.meals[0]);
        });
    },
    // 获取随机菜谱返回的配料信息
    getMore(meal) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
      this.meal = meal;
      this.meal.ingredients = ingredients;
      this.showSingleMeal = true;
      this.$nextTick(this.scrollToMeal);
    },
    // 滚动到菜谱详情位置
    scrollToMeal() {
      window.scroll({
        left: 0,
        top: this.findPos(this.$refs.meal),
        behavior: "smooth",
      });
    },
    // 获得对象元素的顶部位置y (Finds y value of given object)
    findPos(obj) {
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return curtop;
      }
    },
  },
};
</script>

<style scoped>
.meal-finder {
  background: #2d2154;
  color: #fff;
  min-height: 100vh;
}
.container {
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.flex {
  display: flex;
}
#search {
  width: 300px;
}
input,
button {
  border: 1px solid #dedede;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  padding: 8px 10px;
  margin: 0;
}
button:focus {
  outline-style: none;
}
.search-btn {
  cursor: pointer;
  border-left: 0;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.random-btn {
  cursor: pointer;
  margin-left: 10px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.meals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}
a,
a:link,
a:visited,
a:hover,
a:active,
a:focus {
  text-decoration: none;
  color: inherit;
}

.meal {
  cursor: pointer;
  position: relative;
  height: 180px;
  width: 180px;
  text-align: center;
}
.meal img {
  width: 100%;
  height: 100%;
  border: 4px #fff solid;
  border-radius: 2px;
}
.meal-info {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in;
  opacity: 0;
}
.meal:hover .meal-info {
  opacity: 1;
}
.single-meal {
  margin: 30px auto;
  width: 70%;
}
.single-meal img {
  width: 300px;
  margin: 15px;
  border: 4px #fff solid;
  border-radius: 2px;
}
.single-meal-info {
  margin: 20px;
  padding: 10px;
  border: 2px #e09850 dashed;
  border-radius: 5px;
}
.single-meal p {
  margin: 0;
  letter-spacing: 0.5px;
  line-height: 1.5;
}
.single-meal ul {
  padding-left: 0;
  list-style-type: none;
}
.single-meal ul li {
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: #fff;
  display: inline-block;
  color: #2d2013;
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  margin: 0 5px 5px 0;
}
@media (max-width: 800px) {
  .meals {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .meals {
    grid-template-columns: repeat(2, 1fr);
  }

  .meal {
    height: 200px;
    width: 200px;
  }
}
@media (max-width: 500px) {
  #search {
    width: 100%;
  }

  .meals {
    grid-template-columns: 1fr;
  }

  .meal {
    height: 300px;
    width: 300px;
  }
}
</style>

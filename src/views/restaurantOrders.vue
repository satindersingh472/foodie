<template>
  <div>
    <restaurant-header></restaurant-header>
    <div ref="orders">
      <div v-if="message !== undefined">{{ message }}</div>
      <div ref="single_order"></div>
    </div>
  </div>
</template>

<script>
import RestaurantHeader from "@/components/restaurantHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";

export default {
  components: {
    RestaurantHeader,
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/restaurant-order`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          token: cookies.get(`token`),
        },
      })
      .then((response) => {
        for (let i = 0; i < response[`data`].length; i++) {
            // if(this.$refs[`single_order`][`innerHTML`] === (this.$refs[`order_id_${response[`data`][i][`order_id`]}`])){
            //     this.$refs[`order_id_${response[`data`][i][`order_id`]}`] += `<div> <h2>${response[`data`][i][`name`]}</h2>  </div>`
            // }
          this.$refs[`order`][`innerHTML`] += `<div ref="order_id_${response[`data`][i][`order_id`]}">
        <h2>${response[`data`][i][`name`]}</h2>
        </div>`;
        }
      })
      .catch((error) => {
        if (error) {
          this.message = `There is some error`;
        }
      });
  },
  data() {
    return {
      details: undefined,
      message: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
.orders {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.one_box {
  border: 2px solid black;
}
</style>

<template>
  <div>
    <restaurant-header></restaurant-header>
    <div class="orders">
      <div v-if="message !== undefined">{{ message }}</div>
      <div class="one_order" ></div>
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
        this.orders = response[`data`];
        let one_order = document.getElementsByClassName(`one_order`);
        let order = document.getElementsByClassName(`order`);
        for(let i=0; i<this.orders.length;i++){
          if(this.orders[i][`order_id`] === response[`data`][i][`order_id`]){
            one_order[`innerHTML`] += `<div> <h2>${response[`data`][i][`name`]}</h2> </div>`;
          } else {
            order[`innerHTML`] += `<div> <h2> ${response[`data`][i][`name`]} </h2></div>`;
          }
        }
        this.details = response[`data`];

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
      orders: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
.orders {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.single_order {
  border: 2px solid black;
}
</style>

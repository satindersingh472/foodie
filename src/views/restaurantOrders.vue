<template>
  <div>
    <restaurant-header></restaurant-header>
    <div ref="orders">
      <div v-if="message !== undefined">{{ message }}</div>
      <div ref="single_order" v-for="(detail,index) in details" :key="index">
        <h2>{{detail[`name`]}}</h2>
      </div>
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
        if (response) {
          this.details = response[`data`];
        }
      })
      .catch((error) => {
        if (error) {
          this.message = `There is some error`;
        }
      });
  },
  methods: {
  },
  data() {
    return {
      details: undefined,
      message: undefined,
      order_id: undefined,
      key: undefined
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

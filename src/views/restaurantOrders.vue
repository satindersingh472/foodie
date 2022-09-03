<template>
  <div>
    <restaurant-header></restaurant-header>
    <div class="unique_order" v-for="(order, index) in orders" :key="index">
      <confirm-order :order="order"></confirm-order>
      <complete-order :order="order"></complete-order>
      <div v-for="detail in details" :key="detail[`order_id`]">
        <div v-if="order === detail[`order_id`]">
          <h2>{{ detail[`name`] }}</h2>
        </div>
      </div>
      <h2>{{ order }}</h2>
    </div>
  </div>
</template>

<script>
import RestaurantHeader from "@/components/restaurantHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";
import ConfirmOrder from "@/components/confirmOrder.vue";
import CompleteOrder from "@/components/completeOrder.vue";
export default {
  components: {
    RestaurantHeader,
    ConfirmOrder,
    CompleteOrder,
  },
  methods: {
    unique_orders() {
      for (let i = 0; i < this.details.length; i++) {
        if (this.orders.includes(this.details[i][`order_id`]) === false) {
          this.orders.push(this.details[i][`order_id`]);
        }
      }
    }
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
          this.unique_orders();
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
      orders: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.unique_order {
  border: 2px solid black;
}
</style>

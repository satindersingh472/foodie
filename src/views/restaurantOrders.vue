<template>
  <div>
    <restaurant-header></restaurant-header>
    <div class="orders">
      <div v-if="message !== undefined">{{ message }}</div>
      <order-id
        v-for="detail in details"
        :key="detail[`order_id`]"
        :detail="detail"
      ></order-id>
      <div v-for="(order,index) in orders" :key="index" >
        <h2>Order ID: {{order}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantHeader from "@/components/restaurantHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";
import OrderId from "@/components/orderId.vue";
export default {
  components: {
    RestaurantHeader,
    OrderId,
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

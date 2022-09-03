<template>
  <div>
    <restaurant-header></restaurant-header>
    <!-- unique order div has all the unique orders -->
    <div class="unique_order" v-for="(order, index) in orders" :key="index">
      <!-- confirm order will confirm the specific order which is clicked -->
      <!-- order props is being sent thru the attribue to the confirm order component -->
      <!-- confirm order will use this props as a data required for an endpont to confirm -->
      <confirm-order :order="order"></confirm-order>
      <!-- complete order will help to show the order as completed  -->
      <!-- order props is being sent thru the attribue to the complete order component -->
      <!-- completer order will use the props as a data required for an endpoint to complete -->
      <complete-order :order="order"></complete-order>
      <!-- every order will loop thru every detail in details array -->
      <!-- if a detail order id match with unique order then it will get render inside the div -->
      <div v-for="detail in details" :key="detail[`order_id`]">
        <div v-if="order === detail[`order_id`]">
          <h2>{{ detail[`name`] }}</h2>
        </div>
      </div>
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
    // unique order method will get called by api response
    // this method will filter out the duplicate order_id in data from response
    // then the unique order number will get pushed into the orders array
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
        // endpoint for getting orders
        url: `https://innotechfoodie.ml/api/restaurant-order`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          token: cookies.get(`token`),
        },
      })
      .then((response) => {
        if (response) {
          // if response successfull then details store the data array from response
          this.details = response[`data`];
          // unique orders will filter out the unique orders
          // and save them to compare
          this.unique_orders();
        }
      })
      .catch((error) => {
        if (error) {
          /* message will be shown if there is an error*/
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

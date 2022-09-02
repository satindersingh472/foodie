<template>
  <div>
    <restaurant-header></restaurant-header>
    <div ref="orders">
      <div v-if="message !== undefined">{{ message }}</div>
        <complete-order></complete-order>
        <h2>{{orders}}</h2>
    </div>
  </div>
</template>

<script>
import RestaurantHeader from "@/components/restaurantHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";
import CompleteOrder from "@/components/completeOrder.vue";
export default {
  components: {
    RestaurantHeader,
    CompleteOrder
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
          for(let i=0;i<this.details.length;i++){
            if(this.orders.includes(this.details[i][`order_id`]) === false){
              this.orders.push(this.details[i][`order_id`]);
              }
              for(let k=0;k<this.orders.length;k++){
                if(this.orders[k]=== this.details[i][`order_id`]){
                  this.orders.push(this.details[i])
                }
              }
            }
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
      orders: []
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

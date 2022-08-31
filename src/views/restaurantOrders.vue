<template>
  <div class="orders">
    <div v-if="message !== undefined ">{{message}}</div>
    <div v-for="(detail,index) in details" :key="index">
        <h2>Order ID:{{detail[`order_id`]}}</h2>
        <h2>Name:{{detail[`name`]}}</h2>
        <p>Price:{{detail[`prcie`]}}</p>
        <p>Confirmed{{detail[`is_confirmed`]}}</p>
        <p>Completed{{detail[`is_complete`]}}</p>
        <p>Menu Item Id: {{detail[`menu_item_id`]}}</p>
        <div>
            <confirm-order :order="detail[`order_id`]"></confirm-order>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import ConfirmOrder from "@/components/confirmOrder.vue";
export default {
    components: {
        ConfirmOrder,
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
    this.details = response[`data`]
      })
      .catch((error) => {
        if(error){
            this.message = `There is some error`;
        }
      });
  },
  data() {
    return {
        details: undefined,
        message: undefined
    }
  },
};
</script>

<style lang="scss" scoped>
.orders{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

</style>

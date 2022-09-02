<template>
  <div>
    <!-- confirm order component is a button inside restaurant orders to confirm orders -->
    <button @click="send_request(order,$event) " >Confirm</button>
    <!-- if order not get confirmed or get confirmed an appropriate message will get displayed -->
    <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  // this component acts like a child component and will expect props from parent component
  // in this props an order is sent from parent in a form of number so that
  // it can be send as a data for patch method
  props: {
    order: Number,
  },
  methods: {
    // send request will get the order along with the event and use that order in a data
    send_request(order) {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant-order`,
          method: `PATCH`,
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`)
          },
          data:{
             order_id: order,
            is_confirmed: `true`
          }
        })
        .then((response) => {
          if(response){
            // if response is success than message will be displayed 
            this.message = `order Id ${this.order} is confirmed`;
          }
        })
        .catch((error) => {
          if(error){
            // if error than message will be displayed
            this.message = `Error confirming this order`;
          }
        });
    },
  },
  data() {
    return {
        message: undefined,
    }
  },
};
</script>

<style lang="scss" scoped></style>

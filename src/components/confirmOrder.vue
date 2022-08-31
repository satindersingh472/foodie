<template>
  <div>
    <button @click="send_request(order,$event) " >Confirm</button>
    <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  props: {
    order: Number,
  },
  methods: {
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
            this.message = `order Id ${this.order} is confirmed`;
          }
        })
        .catch((error) => {
          if(error){
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

<template>
  <div>
    <button @click="send_request(order,$event) ">Complete</button>
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
            is_complete: `true`
          }
        })
        .then((response) => {
          if(response){
            this.message = `order Id ${this.order} is completed`;
          }
        })
        .catch((error) => {
          if(error){
            this.message = `Error completing this order`;
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

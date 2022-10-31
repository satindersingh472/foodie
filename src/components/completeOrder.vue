<template>
  <div>
    <!-- this component is the complete order button which is used to mark order as complete -->
    <button @click="send_request(order,$event)">Complete</button>
    <!-- h2 tag will display a message if it is undefined and based on condition -->
    <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</template>

<script>
// need cookies and axios for this page so importing both
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
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant_order`,
          method: `PATCH`,
          headers: {
            token: cookies.get(`token`)
          },
          data:{
            order_id: order,
            is_completed: `true`
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

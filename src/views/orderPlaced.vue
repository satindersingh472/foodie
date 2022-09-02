<template>
<div>
  <!-- this component will show the orders placed by the client that is logged in -->
     <page-header></page-header>
  <div class="main_page">
    <div class="order_item" v-for="(detail,index) in details" :key="index">
        <h2>Ordered {{detail[`name`]}}</h2>
        <p>Order ID:{{detail[`order_id`]}}</p>
        <p>Item ID {{detail[`menu_item_id`]}}</p>
        <p>Price:{{detail[`price`]}}</p>
        <p>Confirmed: {{detail[`is_confirmed`]}}</p>
        <p>Completed: {{detail[`is_complete`]}}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import pageHeader from '@/components/pageHeader.vue';
export default {
  components: { pageHeader },
  mounted() {
    axios
      .request({
        // endpoint for getting all the orders placed by the client
        url: `https://innotechfoodie.ml/api/client-order`,
        headers: {
          "x-api-key": `TVTZDiQZDzjkWqVkNCxr`,
          token: cookies.get(`token`),
        },
      })
      .then((response) => {
        // if response is successfull then all the orders will be stored in an array called details
        this.details = response[`data`];
        // the following code is to set the decimal place for price to 2
         for (let i = 0; i < response[`data`].length; i++) {
          this.details[i][`price`] = response[`data`][i][`price`].toFixed(2);
        }
      })
      .catch((error) => {
        if(error){
          // if error exists then the following string will be shown as a message
            this.message = `something went wrong`;
        }
      });
  },
  data() {
    return {
        message: undefined,
        details: undefined,
    }
  },
};
</script>

<style lang="scss" scoped>
.main_page{
    display: grid;
    place-items: center;
    grid-auto-flow: column;
}
.order_item{
    border: 2px solid black;
    display: grid;
    padding: 10px;
}

 </style>

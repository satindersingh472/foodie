<template>
  <div class="main_page">
    <div class="order_item" v-for="(detail,index) in details" :key="index">
        <h2>Ordered {{detail[`name`]}}</h2>
        <p>Order ID:{{detail[`order_id`]}}</p>
        <p>Item ID {{detail[`menu_item_id`]}}</p>
        <p>Price:{{detail[`price`]}}</p>
        <p v-if="confirmation === false">Not Confirmed</p>
        <p v-if="confirmation !== false">Confirmed</p>
        <p v-if="completion === false">Not Completed</p>
        <p v-if="completion !== false">Completed</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/client-order`,
        headers: {
          "x-api-key": `TVTZDiQZDzjkWqVkNCxr`,
          token: cookies.get(`token`),
        },
      })
      .then((response) => {
        this.details = response[`data`];
         for (let i = 0; i < response[`data`].length; i++) {
          this.details[i][`price`] = response[`data`][i][`price`].toFixed(2);
          if(response[`data`][i][`is_complete`] !== 0){
           this.completion = true;
          }
          if(response[`data`][i][`is_confirmed`] !== 0){
            this.confirmation = true;
          }
        }
      })
      .catch((error) => {
        if(error){
            this.message = `something went wrong`;
        }
      });
  },
  data() {
    return {
        message: undefined,
        details: undefined,
        completion: false,
        confirmation: false
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

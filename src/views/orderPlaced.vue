<template>
<div>
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

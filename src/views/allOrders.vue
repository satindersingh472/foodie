<template>
<div>
  <!-- this component will show the orders placed by the client that is logged in -->
     <page-header></page-header>
       <div class="unique_order" v-for="(order, index) in orders" :key="index">
   <div class="order_number"><h2>Order No. {{order}}</h2></div>
      <div v-for="detail in details" :key="detail[`order_id`]">
        <div v-if="order === detail[`order_id`]">
          <h2>{{detail[`name`]}}  ${{detail[`price`]}}</h2>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import pageHeader from '@/components/pageHeader.vue';
export default {
  components: { pageHeader,},
  methods: {
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
        this.unique_orders();
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
        orders: []
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
.unique_order{
    border: 2px solid black;
    display: grid;
    padding: 10px;
    margin-top: 10px;
    .order_number{
      display: grid;
      place-items: center;
      background-color: green;
    }
}

 </style>

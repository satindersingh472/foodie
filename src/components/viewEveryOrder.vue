<template>
  <div>
    <!-- this component will show the orders placed by the client or restaurant that is logged in -->
    <div class="all_orders">
      <h2>All Orders</h2>
      <!-- following div will use the orders array and compare value from  -->
      <div class="unique_order" v-for="(order, index) in orders" :key="index">
        <div class="order_number">
          <h2 ref="order_box">Order No. {{ order }}</h2>
          <!-- if restaurant is logged in then the following components will show up inside orders -->
             <div v-if="cookies_exist === `restaurant`" class="confirm_complete">
              <confirm-order :order="order"></confirm-order>
              <complete-order :order="order"></complete-order>
            </div>
        </div>
        <div v-for="detail in details" :key="detail[`order_id`]">
          <div v-if="order === detail[`order_id`]">
            <h2>{{ detail[`name`] }} ${{ detail[`price`] }}</h2>
         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
import ConfirmOrder from "@/components/confirmOrder.vue";
import CompleteOrder from "@/components/completeOrder.vue";
export default {
  components: {
    ConfirmOrder,
    CompleteOrder
  },
  methods: {
    /*unique orders will create a new array called orders and will contain all the unique values of orders that are made */
unique_orders() {
      for (let i = 0; i < this.details.length; i++) {
        if (this.orders.includes(this.details[i][`order_id`]) === false) {
          this.orders.push(this.details[i][`order_id`]);
          this.orders.reverse();
      }
    }
  },
  },
  mounted() {
/*if cleint is logged in then api for client will be called
and if restaurant is logged in aoai for restaurant will be called  */
  if(cookies.get(`client_id`)){
    this.cookies_exist = `client`;
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/client_order`;
    } else if(cookies.get(`restaurant_id`)){
      this.cookies_exist = `restaurant`;
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant_order`;
    }

    axios
      .request({
        // endpoint for getting all the orders placed by the client
        url: this.url_value,
        headers: {
          token: cookies.get(`token`)
        },
      })
      .then((response) => {
        // if response is successfull then all the orders will be stored in an array called details
        this.details = response[`data`]
        // the following code is to set the decimal place for price to 2
        for (let i = 0; i < response[`data`].length; i++) {
          this.details[i][`price`] = response[`data`][i][`price`].toFixed(2)
        }
        this.unique_orders();
      })
      .catch((error) => {
        if (error) {
          // if error exists then the following string will be shown as a message
          this.message = `something went wrong`
        }
      })
  },
  data() {
    return {
      message: undefined,
      details: undefined,
      orders: [],
      url_value: undefined,
      cookies_exist: undefined
    }
  },
}
</script>

<style lang="scss" scoped>
*{
  margin: 0px;
  padding: 0px;
}
.links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 20px;
  margin: 10px auto;
  *{
    text-decoration: none;
  }
}
.main_page {
  display: grid;
  place-items: center;
  grid-auto-flow: column;
}
.all_orders {
  display: grid;
  place-items: center;
  text-align: center;
  gap: 10px;
  .unique_order {
    border: 2px solid lightcoral;
    width: 100%;
    padding: 10px;
    .order_number {
        background-color: lightcoral;
        padding: 10px;
        .confirm_complete{
          display: grid;
          gap: 1vh;
        }
    }
  }
}
</style>

<template>
  <div class="main_page">
    <div class="all_orders">
             <h2 class="confirmed_heading" >Confirmed Orders</h2>
             <!-- unique order contains the unique order values
             it will match order id from details and group the same ones -->
      <div class="unique_order" v-for="(order, index) in orders" :key="index">
        <div class="order_number">
          <h2 ref="order_box">Order No. {{ order }}</h2>
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
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  methods: {
    // unique order array contains unique order value
    unique_orders() {
      for (let i = 0; i < this.details.length; i++) {
        if (this.orders.includes(this.details[i][`order_id`]) === false) {
          this.orders.push(this.details[i][`order_id`])
          this.orders.reverse();
        }
      }
    },
  },
  mounted() {
    /*url value is api endpoint */
    if(cookies.get(`client_id`)){
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/client_order`;
    } else if(cookies.get(`restaurant_id`)){
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant_order`;
    }


    axios
      .request({
        url: this.url_value,
        headers: {
          token: cookies.get(`token`)
        },
        params: {
          is_confirmed: `true`,
        },
      })
      .then((response) => {
        this.details = response[`data`]
        /*fixing the decimal place for response price to 2 decimal places */
        for (let i = 0; i < response[`data`].length; i++) {
          this.details[i][`price`] = response[`data`][i][`price`].toFixed(2)
        }
        this.unique_orders()
      })
      .catch((error) => {
        error
      })
  },
  data() {
    return {
      details: undefined,
      orders: [],
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
.all_orders {
  display: grid;
  place-items: center;
  text-align: center;
  .confirmed_heading{
    color: orange;
  }
  .unique_order {
    border: 2px solid orange;
    padding: 10px;
    width: 100%;
    .order_number{
        background-color: orange;
        padding: 10px;
    }
  }
}
</style>

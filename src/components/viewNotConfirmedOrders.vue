<template>
  <div class="main_page">
 
    <div class="all_orders">
      <h2 class="not_confirmed_heading">Not Confirmed Orders</h2>
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
       /*unique orders will create a new array called orders and will contain all the unique values of orders that are made */
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
    /*it checks for cookies if client is logged in then url value will call client api and vice-versa */
    if (cookies.get(`client_id`)) {
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/client_order`
    } else if (cookies.get(`restaurant_id`)) {
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant_order`
    }

    axios
      .request({
        url: this.url_value,
        headers: {
          token: cookies.get(`token`)
        },
        params: {
          is_confirmed: `false`,
        },
      })
      .then((response) => {
        this.details = response[`data`]
        /*the following code will set the price of all items to 2 decimal places */
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
  .not_confirmed_heading {
    color: goldenrod;
  }
  .unique_order {
    border: 2px solid goldenrod;
    padding: 10px;
    width: 100%;
    .order_number {
      background-color: goldenrod;
      padding: 10px;
    }
  }
}
</style>

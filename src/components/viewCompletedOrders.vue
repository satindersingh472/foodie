<template>
  <div class="main_page">
    <div class="all_orders">
      <h2 class="completed_heading">Completed Orders</h2>
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
    unique_orders() {
      for (let i = 0; i < this.details.length; i++) {
        if (this.orders.includes(this.details[i][`order_id`]) === false) {
          this.orders.push(this.details[i][`order_id`])
        }
      }
    },
  },
  mounted() {
    if(cookies.get(`client_id`)){
      this.url_value = `https://innotechfoodie.ml/api/client-order`;
    } else if(cookies.get(`restaurant_id`)){
      this.url_value = `https://innotechfoodie.ml/api/restaurant-order`;
    }

    axios
      .request({
        url: this.url_value,
        headers: {
          'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
          token: cookies.get(`token`),
        },
        params: {
          is_complete: `true`,
        },
      })
      .then((response) => {
        this.details = response[`data`]
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
      url_value: undefined
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
  .completed_heading {
    display: grid;
    text-align: center;
    color: green;
  }
  .unique_order {
    border: 2px solid green;
    padding: 10px;
    width: 100%;
    text-align: center;
    .order_number {
      background-color: lightgreen;
      text-align: center;
      padding: 5px;
    }
  }
}
</style>

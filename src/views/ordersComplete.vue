<template>
  <div class="main_page">
    <page-header></page-header>
    <div class="links">
      <button class="all_button" >
        <router-link to="/all_orders">View All Orders</router-link>
      </button>
      <button class="confirmed_button">
        <router-link to="/orders_confirmed">View Confirmed Orders</router-link>
      </button>
            <button class="not_confirmed_button"><router-link to="/orders_not_confirmed">View Not Confirmed Orders</router-link></button>
            <button class="not_complete_button" ><router-link to="/orders_not_complete">View Not Completed Orders</router-link> </button>

    </div>
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
import PageHeader from '@/components/pageHeader.vue'
export default {
  components: {
    PageHeader,
  },
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
.links {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 10px auto;
  * {
    text-decoration: none;
  }
  .all_button {
    background-color: lightcoral;
    padding: 10px;
  }
  .confirmed_button {
    background-color: orange;
  }
  .not_confirmed_button{
    background-color: goldenrod;
  }
  .not_complete_button{
    background-color: yellowgreen;
  }
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
@media only screen and (min-width:400px){
  .confirmed_button{
    padding: 10px;
  }
}
</style>

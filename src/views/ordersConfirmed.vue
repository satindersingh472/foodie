<template>
  <div class="main_page">
    <page-header></page-header>
    <div class="links">
      <button class="all_button" ><router-link to="/all_orders">View All Orders</router-link></button>
      <button class="complete_button">
        <router-link to="/orders_complete">View Completed Orders</router-link>
      </button>
    </div>
    <div class="all_orders">
             <h2 class="confirmed_heading" >Confirmed Orders</h2>
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
          is_confirmed: `true`,
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
  *{
    text-decoration: none;
  }
  .complete_button{
    background-color: lightgreen;
  }
  .all_button{
    background-color: lightcoral;
    padding: 10px;
  }
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
@media only screen and (min-width:400px){
  .complete_button{
    padding: 10px;
  }
}
</style>

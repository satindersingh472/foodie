<template>
  <!-- client cart component is displaying the items added to the order but not yet ordered -->
  <div class="main_page">
    <page-header></page-header>
    <!-- all items div will have divs with class order recieved  -->
    <!-- if show something is true then show the items i.e if no cookies then show something is false and there will be nothing on the page -->
    <div v-if="show_something === false">
      <h2>Your cart is empty</h2>
    </div>
    <div class="items_container" v-if="show_something === true">
      <h1>Cart</h1>
      <div class="all_items">
        <!-- order_recieved will have detail about the items in cart -->
        <div
          class="order_recieved"
          v-for="(order_detail, index) in order_details"
          :key="index"
        >
          <img :src="order_detail[`image_url`]" />
          <h2>{{ order_detail[`name`] }}</h2>
          <p>${{ order_detail[`price`] }}</p>
          <!-- remove button will remove the particular item based on index -->
          <button class="delete_button" @click="delete_item(index, $event)">Remove</button>
        </div>
      </div>
      <!-- place order button will send the request to place an order -->
      <button @click="send_request" class="place_order">Place order</button>
    </div>
     <h2 v-if="message !== undefined">{{ message }}</h2>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import pageHeader from '@/components/pageHeader.vue'
export default {
  components: { pageHeader },
  mounted() {

    this.order_details = JSON.parse(cookies.get(`orders`))
    // if cookies are there then show something is true
    if (this.order_details.length !== 0) {
      this.show_something = true
    }
    // order details is parsed value of cookies orders
    // cookies orders have the details or object containing detail of evey item
    // because when orders cookies were set they contained the stringify value of a menu item
    // for every item in the cart or inside the orders cookies the id will be pushed to items array
    for (let i = 0; i < this.order_details.length; i++) {
      // items array will be used to send menu items id coming from orders cookies
      this.items.push(this.order_details[i][`menu_id`])
    }
  },
  methods: {
    // delete item will delete the item based on index
    delete_item(index) {
      this.order_details.splice(index, 1)
      this.items.splice(index,1)
      // after deleting the item it will set the cookies back again to stringify
      // mounted lifecycle will help parse the cookies back again
      cookies.set(`orders`, JSON.stringify(this.order_details));
       if (this.order_details.length === 0) {
        cookies.remove(`orders`);
        this.show_something = false
      }
    },
    send_request() {
      axios
        .request({
          // endpoint url for making an ap request to place order
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client_order`,
          // post method is used to send order request
          method: `POST`,
          // api key and token for client authentication is used as headers
          headers: {
            token: cookies.get(`token`)
          },
          // menu items and restaurant id are used to send data for an order
          data: {
            menu_items: this.items,
            restaurant_id: cookies.get(`restaurant_present`),
          },
        })
        .then((response) => {
            // if response is successfull then the value of message will displayed on page
            // cookies will be removed
            cookies.remove(`orders`)
            // show something will set to false i.e there will be no items displayed after an order is placed
            this.show_something = false
            // the message will appear after the order is successfully placed
            this.message = `Successfull!! Your order id is ${response[`data`][`order_id`]}`
        })
        .catch((error) => {
            // if there is an error then the following message will get displayed
            this.message = error['response']['data']
        })
    },
  },
  data() {
    return {
      order_details: undefined,
      items: [],
      message: undefined,
      show_something: false,
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  text-align: center;
  padding: 0px;
  margin: 0px;
}
img {
  height: 250px;
  width: 100%;
  object-fit: cover;
}
.items_container {
  display: grid;
}
.all_items {
  display: grid;
}
.order_recieved {
  width: 100%;
  box-shadow: 3px 3px 6px grey;
  margin: 10px auto;
  display: grid;
  place-items: center;
  gap: 1vh;
  p{
    font-size: 1.3rem;

  }
}
.delete_button{
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 15px;
}
.place_order {
  display: grid;
  justify-self: center;
  padding: 10px;
  margin: 10px;
  background-color: green;
  color: white;
  font-size: 1.5rem;
}
.main_page {
  display: grid;
  gap: 20px;
}

@media only screen and (min-width: 500px) {
  .all_items {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    .order_recieved {
      display: grid;
      width: 300px;
      place-items: center;
    }
  }
}
</style>

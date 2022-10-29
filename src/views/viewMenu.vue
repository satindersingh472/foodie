<template>
  <div>
    <!-- view menu component is for the client side menu view 
    it is little different from restaurant menu because it -->
    <page-header></page-header>
    <info-restaurant :info="info" ></info-restaurant>
    <div v-if="message !== undefined"><h1>{{message}}</h1></div>
    <h1 class="heading_menu" >{{info[`name`]}}'s Menu</h1>
    <div class="all_content" v-if="info !== undefined">
      <div class="content_item" v-for="(detail, index) in details" :key="index">
        <img
          class="content_item_image"
          :src="detail[`image_url`]"
          :alt="`image of ${detail[`name`]}`"
        />
        <div class="details_container">
          <div class="content_item_details">
            <p>{{ detail[`name`] }}</p>
            <p>${{ detail[`price`] }}</p>
          </div>
          <p>{{ detail[`description`] }}</p>
          <button @click="add_items(detail, $event)">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import PageHeader from '@/components/pageHeader.vue'
import InfoRestaurant from '@/components/infoRestaurant.vue'
export default {
  components: {
    PageHeader,
    InfoRestaurant,
  },
  methods: {
    add_items(detail) {
      /*if orders length is 0 then the item from any restaurant can be pushed to the orders array */
      if (this.orders.length === 0) {
        this.orders.push(detail)
        // cookies restaurant present will always be set on then first item added 
        cookies.set(`restaurant_present`,this.info[`restaurant_id`]);
        // orders array will get stringify
        cookies.set(`orders`, JSON.stringify(this.orders))
        /*if second or other than the first item user try to add it will check
        if the previously set cookies restaurant present equual to the cookies restaurant selected i.e this.info[`restaurant id`] */
      } else if (this.info[`restaurant_id`] === Number(cookies.get(`restaurant_present`))){
        this.orders.push(detail)
        // after pushing cookies value will be stringified
        cookies.set(`orders`,JSON.stringify(this.orders))
      } else {
        /*if user try to add items from restaurant other than the restaurant whose items were already in the cart 
        the error alert will pop up to delete or purchase from cart before */
        this.cart_error = `Cart already contains items from other restaurant.Please purchase or remove other items from the cart before adding.`;
        alert(this.cart_error);
      }
    },
  },
  mounted() {
    // if cookies exist on mount then orders value will get parsed to add more data
    if (cookies.get(`orders`)) {
      this.orders = JSON.parse(cookies.get(`orders`))
    }
    // restaurant selected will be the restaurant clicked from discovered restaurant page
    this.info = cookies.get(`restaurant_selected`)
    axios
      .request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/menu`,
        params: {
          restaurant_id: this.info[`restaurant_id`],
        },
      })
      /*after successful response all the menu items will have price in more than 2 decimal places
      so the below loop will change the decimals to only 2 fixed decimal positions */
      .then((response) => {
        this.details = response[`data`]
      })
      .catch((error) => {
        if(error){
          this.message = `Error in getting information about the menu items of this restuarant`;
        }
      })
  },
  data() {
    return {
      info: undefined,
      details: undefined,
      orders: [],
      cart_error: undefined,
      message: undefined
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}
img {
  width: 100%;
  height: 250px;
}
.heading_menu{
  text-transform: capitalize;
}
.content_item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px;
  box-shadow: 3px 3px 6px grey;
  .content_item_image {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }
  .details_container {
    display: grid;
    align-items: center;
    button {
      justify-self: center;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 1.1rem;
    }
    .content_item_details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      text-align: start;
    }
  }
}
@media only screen and (min-width: 500px) {
  .all_content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    place-items: center;
    .content_item {
      width: 500px;
      img {
        width: 100%;
        height: 25vh;
      }
    }
  }
}
</style>

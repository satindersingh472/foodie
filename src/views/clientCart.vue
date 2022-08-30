<template>
  <div class="main_page">
    <div class="all_items">
      <div
        class="order_recieved"
        v-for="(order_detail, index) in order_details"
        :key="index"
      >
        <img :src="order_detail[`image_url`]" />
        <h2>{{ order_detail[`name`] }}</h2>
        <p>{{ order_detail[`price`] }}</p>
        <button @click="delete_item(index, $event)">Remove</button>
      </div>
    </div>
    <button @click="send_request" class="place_order">Place order</button>
    <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  mounted() {
    this.order_details = JSON.parse(cookies.get(`orders`));
    for (let i = 0; i < this.order_details.length; i++) {
      this.items.push(this.order_details[i][`id`]);
    }
  },
  methods: {
    delete_item(index) {
      this.order_details.splice(index, 1);
      cookies.set(`orders`, JSON.stringify(this.order_details));
    },
    send_request() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-order`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
            token: cookies.get(`token`)
          },
          data:{
            menu_items: this.items,
            restaurant_id: cookies.get(`restaurant_number`)
          }
        })
        .then((response) => {
          if(response){
            this.message = `Order placed successfully`;
          }
        })
        .catch((error) => {
          if(error){
            this.message = `Order not placed`;
          }
        });
    },
  },
  data() {
    return {
      order_details: undefined,
      items: [],
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  text-align: center;
  padding: 0px;
  margin: 0px;
}
img {
  height: 250px;
  width: 300px;
  object-fit: cover;
}
.place_order {
  display: grid;
  justify-self: center;
  padding: 20px;
}
.main_page {
  display: grid;
  gap: 20px;
}
.all_items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .order_recieved {
    display: grid;
    place-items: center;
  }
}
</style>

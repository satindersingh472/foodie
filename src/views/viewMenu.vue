<template>
  <div>
 <page-header></page-header>
    <h1>this is menu profile page</h1>
    <div v-if="info !== undefined">
      <div class="content_item" v-for="detail in details" :key="detail[`id`]">
        <img
          class="content_item_image"
          :src="detail[`image_url`]"
          :alt="`image of ${detail[`name`]}`"
        />
        <div class="content_item_options">
          <p>{{ detail[`description`] }}</p>
          <p>{{detail[`id`]}}</p>
          <button @click="add_items(detail,$event)">Add to Cart <client-cart></client-cart></button>
          <p>{{quantity}}</p>
        </div>
        <div class="content_item_details">
          <p>{{ detail[`name`] }}</p>
          <p>${{ detail[`price`] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "@/components/pageHeader.vue";
import ClientCart from "@/views/clientCart.vue";
export default {
  components: {
PageHeader,
ClientCart
  },
methods: {
    add_items(detail) {
        this.orders.push(detail[`id`]);
        cookies.set(`orders`, this.orders);
    }
},
  mounted() {
      if(cookies.get(`orders`)){
        this.orders.push(cookies.get(`orders`));
      }
    this.info = cookies.get(`restaurant_number`);
    axios
      .request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
        },
        params: {
          restaurant_id: this.info,
        },
      })
      .then((response) => {
        this.details = response[`data`];
        for (let i = 0; i < response[`data`].length; i++) {
          this.details[i][`price`] = response[`data`][i][`price`].toFixed(2);
        }
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      info: undefined,
      details: undefined,
      orders: [],
      quantity: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
img {
  width: 100%;
  height: 250px;
}
.content_item {
  display: grid;
  text-align: center;
  .content_item_options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
  }
  .content_item_details {
    display: grid;
    grid-auto-flow: column;
  }
}
</style>

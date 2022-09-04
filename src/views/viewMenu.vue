<template>
  <div>
    <!-- view menu component is for the client side menu view 
    it is little different from restaurant menu because it -->
    <page-header></page-header>
    <h1>{{info[`name`]}}'s Menu</h1>
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
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "@/components/pageHeader.vue";
export default {
  components: {
    PageHeader,
  },
  methods: {
    add_items(detail) {
      this.orders.push(detail);
      cookies.set(`orders`, JSON.stringify(this.orders));
    },
  },
  mounted() {
    if (cookies.get(`orders`)) {
      this.orders = JSON.parse(cookies.get(`orders`));
    }
    this.info = cookies.get(`restaurant_selected`);
    axios
      .request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
        },
        params: {
          restaurant_id: this.info[`restaurant_id`],
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
    };
  },
};
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
    text-align: start;
    button{
      justify-self: center;
      padding: 5px;
    }
    .content_item_details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      text-align: start;
    }
  }
}
@media only screen and (min-width: 500px){
  .all_content{
    display: grid;
    grid-template-columns:repeat(auto-fit,minmax(500px,1fr));
    place-items: center;
    .content_item{
      width: 500px;
      img{
        width:100%;
        height: 25vh;
      }
    }
  }
}
</style>

<template>
  <div>
<restaurant-header></restaurant-header>
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
          <div>
            <edit-menu :detail="detail"></edit-menu>
          </div>
          <div class="delete_button">
            <delete-menu :detail="detail" ></delete-menu>
          </div>
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
import EditMenu from "./editMenu.vue";
import RestaurantHeader from "@/components/restaurantHeader.vue";
import DeleteMenu from "@/components/deleteMenu.vue";
export default {
  components: {
    EditMenu,
    RestaurantHeader,
    DeleteMenu,
  },
  mounted() {
    this.info = cookies.get(`restaurant_id`);
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

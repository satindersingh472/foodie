<template>
  <div>
<restaurant-header v-if="cookies_restaurant === true"></restaurant-header>
<page-header v-if="cookies_restaurant === false" ></page-header>
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
        <button v-if="show_order === true" >Order</button>
        <button @click="send_details(detail,$event)" v-if="show_menu_edit === true">Edit</button>
        <edit-menu></edit-menu>
        </div>
        <div class="content_item_details">
          <p>{{ detail[`name`]}}</p>
          <p>${{detail[`price`]}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditMenu from './editMenu.vue';
import RestaurantHeader from '@/components/restaurantHeader.vue';
import PageHeader from "@/components/pageHeader.vue";
export default {
    components: {
        EditMenu,
        RestaurantHeader,
        PageHeader
    },
    methods: {
        send_details(details) {
            this.$root.$emit(`recieve_edit`,details);
        }
    },
  mounted() {
    if(cookies.get(`client_id`)){
      this.cookies_restaurant = false;
        this.show_order = true; 
    } else if (cookies.get(`restaurant_id`)){
      this.cookies_restaurant = true;
        this.show_menu_edit = true;
    }
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
        for(let i =0; i<response[`data`].length;i++){
            this.details[i][`price`] = response[`data`][i][`price`].toFixed(2);
        }
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
        show_order: false,
        show_menu_edit: false,
      info: undefined,
      details: undefined,
      cookies_restaurant : true
    };
  },
};
</script>

<style lang="scss" scoped>
*{
    padding: 0px;
    margin: 0px;
}
img{
    width: 100%;
    height: 250px;
}
.content_item{
    display: grid;
    text-align: center;
    .content_item_options{
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
    }
    .content_item_details{
        display: grid;
        grid-auto-flow: column;
    }
}

</style>

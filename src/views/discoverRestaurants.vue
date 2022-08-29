<template>
  <div>
    <page-header></page-header>
    <div @click="send_detail(detail,$event)" class="content_item" v-for="detail in details" :key="detail[`id`]">
      <div class="content_item_image">
        <img :src="detail[`banner_url`]" :alt="`image for ${detail[`name`]}`" />
      </div>
      <h1>{{ detail[`name`] }}</h1>
      <div class="content_item_detail">
        <p> {{detail[`address`]}}<br/>{{ detail[`city`] }}</p>
        <p>{{ detail[`phone_number`] }}</p>
      </div>
      <div>
        <p>{{detail[`restaurant_id`]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/pageHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";
export default {
  components: {
    PageHeader,
  },
  methods: {
    send_detail(detail) {
      cookies.set(`restaurant_number`, detail[`restaurant_id`]);
      this.$router.push(`/view_menu`);
    }
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/restaurants`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
        },
      })
      .then((response) => {
        this.details = response[`data`];
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      details: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.content_item {
  display: grid;
  .content_item_image {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content_item_detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
}
</style>

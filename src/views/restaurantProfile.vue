<template>
  <div>
    <restaurant-header></restaurant-header>
    <rest-profile-header :details="details" ></rest-profile-header>
    <div  class="form">
        <div class="content_item">
            <h3>Name</h3>
            <p>{{details[`name`]}}</p>
        </div>
        <div class="content_item">
            <h3>Address</h3>
            <p>{{details[`address`]}}</p>
        </div>
        <div class="content_item">
            <h3>Phone</h3>
            <p>{{details[`phone_number`]}}</p>
        </div>
    <div class="content_item">
        <h3>Email</h3>
        <p>{{details[`email`]}}</p>
    </div>
    <div class="content_item">
        <h3>Bio</h3>
        <p>{{details[`bio`]}}</p>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import RestaurantHeader from '@/components/restaurantHeader.vue';
import RestProfileHeader from '@/components/restProfileHeader.vue';
export default {
    components: {
        RestaurantHeader,
        RestProfileHeader
    },
  mounted() {
    axios.request({
        url: `https://innotechfoodie.ml/api/restaurant`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
        },
        params: {
          restaurant_id: cookies.get(`restaurant_id`),
        },
      })
      .then((response) => {
        this.details = response[`data`][0];
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
*{
    text-align: center;
    padding: 0px;
    margin: 0px;
}
.banner_image{
    display: grid;
    .profile_image{
        height: 50px;
        width:50px;
        justify-self: start;
    }
}
.form{
    display:grid;
}
.content_item{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>

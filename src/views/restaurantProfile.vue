<template>
  <div>
    <restaurant-header></restaurant-header>
    <rest-profile-header :details="details" ></rest-profile-header>
    <div  class="form">
        <div class="content_item">
            <h3>Name</h3>
            <input type="text" ref="name" :value="`${details[`name`]}`">
        </div>
        <div class="content_item">
            <h3>Address</h3>
         <input type="text" ref="address" :value="`${details[`address`]}`">
        </div>
        <div class="content_item">
          <h3>City</h3>
          <input type="text" ref="city" :value="`${details[`city`]}`">
        </div>
        <div class="content_item">
            <h3>Phone</h3>
          <input type="tel" ref="phone_number" :value="`${details[`phone_number`]}`">
        </div>
    <div class="content_item">
        <h3>Email</h3>
        <input type="text" ref="email" :value="`${details[`email`]}`">
    </div>
    <div class="content_item">
        <h3>Bio</h3>
        <input type="text" ref="bio" :value="`${details[`bio`]}`">
    </div>
    <div class="content_item">
      <h3>Banner Image URL</h3>
      <input type="url" ref="banner_url" :value="`${details[`banner_url`]}`">
    </div>
    <div class="content_item">
      <h3>Profile Image URL</h3>
      <input type="url" ref="profile_url" :value="`${details[`profile_url`]}`">
    </div>
    <div class="content_item">
      <h3>Password</h3>
      <input type="password" ref="password" :value="`${details[`password`]}`">
    </div>
  </div>
  <button @click="send_info" >Save Changes</button>
  <rest-edit-profile></rest-edit-profile>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import RestaurantHeader from '@/components/restaurantHeader.vue';
import RestProfileHeader from '@/components/restProfileHeader.vue';
import RestEditProfile from "@/components/restEditProfile.vue";
export default {
    components: {
        RestaurantHeader,
        RestProfileHeader,
        RestEditProfile
    },
    methods: {
      send_info() {
         this.details[`name`] = this.$refs[`name`][`value`];
      this.details[`address`] = this.$refs[`address`][`value`];
      this.details[`city`] = this.$refs[`city`][`value`];
      this.details[`email`] = this.$refs[`email`][`value`];
      this.details[`phone_number`] = this.$refs[`Phone_number`][`value`];
      this.details[`password`] = this.$refs[`password`][`value`];
      this.details[`bio`] = this.$refs[`bio`][`value`];
      this.details[`banner_url`] = this.$refs[`banner_url`][`value`];
      this.details[`profile_url`] = this.$refs[`profile_url`][`value`];
      this.$root.$emit(`send_edit`, this.details);
      }
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

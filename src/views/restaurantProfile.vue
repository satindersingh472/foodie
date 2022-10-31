<template>
  <div class="main_page" >
    <!-- restaurant profile component is used to display for a restaurant -->
    <h2 v-if="message !== undefined">{{ message }}</h2>
    <page-header></page-header>
    <!-- restaurant form will contain all the information about profile of a restaurant -->
    <div class="all_profile">
      <div class="images">
        <img
          class="banner"
          :src="details[`banner_url`]"
          :alt="`banner for ${details[`name`]}`"
        />
        <img
          class="profile"
          :src="details[`profile_url`]"
          :alt="`logo for ${details[`name`]}`"
        />
      </div>
      <div class="form">
        <div class="content_item">
          <h3>Name</h3>
          <input type="text" ref="name" :value="`${details[`name`]}`" />
        </div>
        <div class="content_item">
          <h3>Address</h3>
          <input type="text" ref="address" :value="`${details[`address`]}`" />
        </div>
        <div class="content_item">
          <h3>City</h3>
          <input type="text" ref="city" :value="`${details[`city`]}`" />
        </div>
        <div class="content_item">
          <h3>Phone</h3>
          <input
            type="tel"
            ref="phone_number"
            :value="`${details[`phone_num`]}`"
          />
        </div>
        <div class="content_item">
          <h3>Email</h3>
          <input type="text" ref="email" :value="`${details[`email`]}`" />
        </div>
        <div class="content_item">
          <h3>Bio</h3>
          <input type="text" ref="bio" :value="`${details[`bio`]}`" />
        </div>
        <div class="content_item">
          <h3>Banner</h3>
          <input
            type="url"
            ref="banner_url"
            :value="`${details[`banner_url`]}`"
          />
        </div>
        <div class="content_item">
          <h3>Profile</h3>
          <input
            type="url"
            ref="profile_url"
            :value="`${details[`profile_url`]}`"
          />
        </div>
      </div>
      <!-- save changes will trigger the send info method -->
      <!-- it will grab all the the values from the fields and emit them globally  -->
      <button @click="send_info">Save Changes</button>
      <!-- rest edit profile is the component that will listen for the global event and act -->
      <rest-edit-profile></rest-edit-profile>
      <change-password class="keep_center" ></change-password>
      <delete-restaurant></delete-restaurant>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import PageHeader from '@/components/pageHeader.vue'
import RestEditProfile from '@/components/restEditProfile.vue'
import DeleteRestaurant from '@/components/deleteRestaurant.vue'
import ChangePassword from "@/components/changePassword.vue"
export default {
  components: {
    PageHeader,
    RestEditProfile,
    DeleteRestaurant,
    ChangePassword
  },
  methods: {
    /* send info will grab the values from input fields and emit them globally */
    send_info() {
      this.details[`name`] = this.$refs[`name`][`value`]
      this.details[`address`] = this.$refs[`address`][`value`]
      this.details[`city`] = this.$refs[`city`][`value`]
      this.details[`email`] = this.$refs[`email`][`value`]
      this.details[`phone_num`] = this.$refs[`phone_number`][`value`]
      this.details[`bio`] = this.$refs[`bio`][`value`]
      this.details[`banner_url`] = this.$refs[`banner_url`][`value`]
      this.details[`profile_url`] = this.$refs[`profile_url`][`value`]
      this.$root.$emit(`send_edit`, this.details)
    },
  },
  mounted() {
    axios
      .request({
        /*endpoint for getting profile a restaurant */
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant`,
        params: {
          /*restaurant id is required for as a params */
          restaurant_id: cookies.get(`restaurant_id`),
        },
      })
      .then((response) => {
        /*if there is a response then it will be stored inside details  */
        this.details = response[`data`][0]
      })
      .catch((error) => {
        if (error) {
          this.message = `There was an error loading the page`
        }
      })
  },
  data() {
    return {
      details: undefined,
      message: undefined,
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
.main_page{
  display: grid;
}
.all_profile {
  display: grid;
  justify-self: center;
  width: 100%;
  gap: 3vh;
  margin-top: 2vh;
  .images {
    display: grid;
    gap: 10px;
    place-items: center;
    .banner {
      display: grid;
      height: 250px;
      width: 100%;
      object-fit: cover;
    }
    .profile {
      height: 100px;
      width: 100px;
      object-fit: cover;
    }
  }
  .form {
    display: grid;
    gap: 2vh;
    .content_item {
      display: grid;
      align-items: center;
      justify-items: start;
      input{
        width: 100%;
        font-size: 1.5rem;
        padding: 5px 0px;
        background-color: #b0cad8;
        border-radius: 10px;
      }
    }
  }
  button{
    justify-self: center;
    padding: 10px;
    border-radius: 10px;
  }
}
.keep_center{
  display: grid;
  place-items: center;
}
@media only screen and (min-width:500px){
  .all_profile{
    width: 500px;
  }
}
</style>

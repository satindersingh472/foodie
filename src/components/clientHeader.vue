<template>
  <div>
    <!-- various links from the client header to navigate to different pages and logout as well  -->
    <router-link to="/profile_page">Profile</router-link>
    <router-link to="/discover_restaurants">Restaurants</router-link>
    <router-link to="/order_placed">Orders</router-link>
    <router-link to="/client_cart">Cart</router-link>
    <router-link v-if="cookies_exist === false" to="/client_login">LogIn</router-link>
    <all-logout v-if="cookies_exist === true"></all-logout>
  </div>
</template>

<script>
import AllLogout from "@/components/allLogout.vue";
import cookies from "vue-cookies";
export default {
  components: {
    AllLogout,
  },
  mounted() {
    if (cookies.get(`client_id`)) {
      this.cookies_exist = true;
    } else {
      this.cookies_exist = false;
    }
  },
  data() {
    return {
      cookies_exist: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>

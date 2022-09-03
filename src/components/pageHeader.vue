<template>
  <div class="navbar">
    <!-- client header will be on the page when cookies client is true i.e. when client cookies are present -->
    <client-header v-if="cookies_client === true"></client-header>
    <!-- restaurant header will be on the page when restaurant cookies are true or present -->
    <restaurant-header v-if="cookies_restaurant === true"></restaurant-header>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import RestaurantHeader from "@/components/restaurantHeader.vue";
import ClientHeader from "@/components/clientHeader.vue";
export default {
  components: {
    ClientHeader,
    RestaurantHeader,
  },
  mounted() {
    // to check if cookies of client or restaurant are present 
    // if client cookies are present or client logged in then cookies client id is true and vice-versa
    if (cookies.get(`restaurant_id`)) {
      this.cookies_restaurant = true;
      this.cookies_client = false;
    } else if (cookies.get(`client_id`)) {
      this.cookies_client = true;
      this.cookies_restaurant = false;
    }
  },
  data() {
    return {
        // cookies restaurant and client both will be false initially
      cookies_restaurant: false,
      cookies_client: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-auto-flow: column;
}
</style>

<template>
  <!-- this page contains the options to login or signup as a client or a restaurant -->
  <div>
    <!-- if cookies token are present then there will be no options -->
    <div v-if="show_user === `discover_restaurant`">
      <discover-restaurants></discover-restaurants>
    </div>
    <div v-if="show_user === `restaurant_profile`">
      <restaurant-profile></restaurant-profile>
    </div>
    <div v-if="show_user === undefined" class="both_options" ref="both_options">
      <foodie-header></foodie-header>
      <div class="client">
        <!-- router link to login or sign up as customer -->
        <router-link class="links" to="/client_sign_up"
          ><button>Login / Sign Up as a Customer</button></router-link
        >
      </div>
      <div class="client">
        <!-- link to login or sign up as a restaurant -->
        <router-link class="links" to="/restaurant_sign_up"
          ><button>Login / Sign Up as a Restaurant</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import FoodieHeader from "@/components/foodieHeader.vue";
import DiscoverRestaurants from "@/views/discoverRestaurants.vue";
import RestaurantProfile from "@/views/restaurantProfile.vue";
import cookies from "vue-cookies";
export default {
  components: {
    FoodieHeader,
    DiscoverRestaurants,
    RestaurantProfile
  },
  mounted() {
    // check if cookies token is present if yes then show option is true
    // if show options is true it will change the html
    if (cookies.get(`restaurant_id`)) {
      this.show_user = `restaurant_profile`;
    } else if (cookies.get(`client_id`)) {
      this.show_user = `discover_restaurant`;
    } else if(cookies.get(`client_id`)||cookies.get(`restaurant_id`) === undefined){
      this.show_user = undefined
    }
  },
  data() {
    return {
      show_user: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
.both_options {
  display: grid;
  gap: 10%;
  place-items: center;
  .links {
    text-decoration: none;
  }
  .client {
    display: grid;
    width: 30vw;
    button {
      font-size: 2rem;
      text-transform: uppercase;
      padding: 10%;
      display: grid;
    }
  }
}
</style>

<template>
  <div class="navbar">
    <div class="logo">
      <img class="logo_image" src="@/assets/logo.svg" alt="foodie logo" />
      <h4>Foodie</h4>
    </div>
    <div class="links">
      <router-link to="/profile_page">Profile</router-link>
      <router-link to="/discover_restaurants">Restaurants</router-link>
      <router-link to="/all_orders">Orders</router-link>
      <router-link to="/client_cart">Cart</router-link>
      <router-link v-if="cookies_exist === false" to="/client_login"
        >LogIn</router-link
      >
      <all-logout v-if="cookies_exist === true"></all-logout>
    </div>
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

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
.navbar {
  display: grid;
  grid-auto-flow: column;
  background-color: #b0cad8;
  align-items: center;
  justify-items: end;
  min-height: 10vh;
  .logo {
    display: grid;
    align-items: center;
    justify-self: start;
    .logo_image {
      height: 40px;
      width: 40px;
      padding-left: 2vh;

    }
    h4{
      font-family: gluten, sans-serif;
    }
  }
  .links {
    display: grid;
    grid-auto-flow: column;
    gap: 20px;
    padding-right: 10px;
    * {
      text-decoration: none;
      color: black;
    }
  }
}
</style>

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
      <all-logout></all-logout>
    </div>
  </div>
</template>

<script>
import AllLogout from "@/components/allLogout.vue";
export default {
  components: {
    AllLogout,
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

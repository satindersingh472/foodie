<template>
  <div class="navbar">
    <!-- restaurant header is displayed when the page will have restaurant cookies  -->
    <!-- it has vaious links to navigate through restaurant side of the website and a logout component as well -->
    <router-link to="/restaurant_profile">Profile</router-link>
    <router-link to="/restaurant_orders">Orders</router-link>
    <all-logout></all-logout>
  </div>
</template>

<script>
// importing various components 
import AllLogout from "@/components/allLogout.vue";
export default {
  components: {
    AllLogout,
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-auto-flow: column;
}
</style>

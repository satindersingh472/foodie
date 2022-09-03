<template>
    <div>
  <div ref="links">
    <router-link to="/profile_page">Profile</router-link>
    <router-link to="/discover_restaurants">Restaurants</router-link>
    <router-link to="/order_placed">Orders</router-link>
    <router-link to="/client_cart">Cart</router-link>
    <router-link v-if="cookies_exist === false" to="/client_login"
      >LogIn</router-link
    >
    <all-logout v-if="cookies_exist === true"></all-logout>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>
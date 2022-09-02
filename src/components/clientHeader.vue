<template>
    <div>
        <!-- various links from the client header to navigate to different pages and logout as well  -->
<router-link to="/profile_page">Profile</router-link>
<router-link to="/client_login">Login</router-link>
<router-link to="/discover_restaurants">Restaurants</router-link>
<router-link to="/order_placed">Orders</router-link>
<router-link to="/client_cart">Cart</router-link>
<all-logout></all-logout>
    </div>
</template>

<script>
import AllLogout from "@/components/allLogout.vue";
    export default {
        components: {
            AllLogout,
        },
    }
</script>

<style lang="scss" scoped>

</style>
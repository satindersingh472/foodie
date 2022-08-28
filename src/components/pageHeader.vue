<template>
    <div class="navbar">
<router-link to="/profile_page">Profile</router-link>
<router-link to="/client_login">Login</router-link>
<router-link to="/client_order">Orders</router-link>
<all-logout></all-logout>
    </div>
</template>

<script>
import AllLogout from "@/components/allLogout.vue";
    export default {
        components:{
            AllLogout,
        }
    }
</script>

<style lang="scss" scoped>
.navbar{
    display: grid;
    grid-auto-flow: column;
    place-items: center;
}
</style>
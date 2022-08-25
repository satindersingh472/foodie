<template>
    <div>
<router-link to="/profile_page">Profile</router-link>
<router-link to="/client_login">Login</router-link>
<client-logout></client-logout>
    </div>
</template>

<script>
import ClientLogout from "@/components/clientLogout.vue";
    export default {
        components:{
            ClientLogout,
        }
    }
</script>

<style lang="scss" scoped>

</style>
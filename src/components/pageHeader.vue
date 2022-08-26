<template>
    <div>
<router-link to="/profile_page">Profile</router-link>
<router-link to="/client_login">Login</router-link>
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

</style>
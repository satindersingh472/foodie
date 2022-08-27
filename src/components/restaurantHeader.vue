<template>
    <div>
      <router-link to="/restaurant_profile">Profile</router-link>
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
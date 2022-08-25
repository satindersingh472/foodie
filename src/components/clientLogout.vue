<template>
    <div>
<p @click="delete_token" >LogOut</p>
    </div>
</template>

<script>
import cookies from "vue-cookies";
    export default {
        methods: {
              delete_token(){
            cookies.remove(`token`);
            cookies.remove(`client_id`);
            this.$router.push(`/`);
        }
        },
      
    }
</script>

<style lang="scss" scoped>

</style>
<template>
    <div v-if="show_component !== false">
<p @click="delete_token" >LogOut</p>
    </div>
</template>

<script>
import cookies from "vue-cookies";
    export default {
        methods: {
              delete_token(){
            if(cookies.get(`client_id`)){
                cookies.remove(`client_id`);
                cookies.remove(`token`);
                this.$router.push(`/`);
            } else if(cookies.get(`restaurant_id`)){
                cookies.remove(`restaurant_id`);
                cookies.remove(`token`);
                this.$router.push(`/`);
            }
            
        }
        },
        mounted () {
            if(cookies.get(`token`)){
                this.show_component = true
            }
        },
        data() {
            return {
                show_component: false
            }
        },
      
    }
</script>

<style lang="scss" scoped>

</style>
<template>
    <div>
        <h1>this is menu profile page</h1>
       <div v-if="info !== undefined">  
        <h1>{{info}}</h1>
       </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
    export default {

        mounted () {
 this.info = cookies.get(`restaurant_id`);
            axios.request({
                url: `https://innotechfoodie.ml/api/menu`,
                headers:{
                    'x-api-key': 'TVTZDiQZDzjkWqVkNCxr'
                },
                params:{
                    restaurant_id: this.info
                }
            }).then((response)=>{response}).catch((error)=>{error});
        },
        data() {
            return {
                info: undefined
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
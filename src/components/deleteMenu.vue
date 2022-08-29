<template>
    <div>
  <h2>{{message}}</h2>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        mounted () {
            this.$root.$on(`recieve_delete`, this.delete_detail);
        },
        methods: {
            delete_detail(detail){
                this.detail = detail;
                this.confirm_delete();
            },
            confirm_delete(){
                if(confirm("are you sure")){
                    this.send_request();
                } else{
                    this.message = `request cancelled`;
                }
            },
            send_request() {
                axios.request({
                    url: 'https://innotechfoodie.ml/api/menu',
                    method: `DELETE`,
                    headers:{
                        'x-api-key': 'TVTZDiQZDzjkWqVkNCxr'
                    }
                  
                }).then((response)=>{response}).catch((error)=>{error});
            }
        },
        data() {
            return {
                detail: undefined,
                message: undefined
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
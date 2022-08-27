<template>
    <div>
        <h1>this is menu profile page</h1>
        <div v-if="info !== undefined">
            <h1>{{info[`restaurant_id`]}}</h1>
        </div>
    </div>
</template>

<script>
// import axios from "axios";
    export default {

        mounted () {
            this.$root.$on(`recieve_detail` , this.make_change);

            // axios.request({
            //     url: `https://innotechfoodie.ml/api/menu`,
            //     headers:{
            //         'x-api-key': 'TVTZDiQZDzjkWqVkNCxr'
            //     },
            //     params:{
            //         restaurant_id: this.info[`restaurant_id`]
            //     }
            // }).then((response)=>{response}).catch((error)=>{error});
        },
        methods: {
            make_change(detail) {
                this.info = detail;
            }
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
<template>
    <div>
    <h2>{{order_details[`name`]}}</h2>
    </div>
</template>

<script>
import cookies from "vue-cookies";
    export default {
    mounted () {
        this.order_details = cookies.get(`orders`);

    },
    data() {
        return {
            order_details: undefined,
            quantity: undefined
        }
    },
        
    }
</script>

<style lang="scss" scoped>

</style>
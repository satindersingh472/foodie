<template>
    <div>
<h2>{{unique_order}}</h2>
    </div>
</template>

<script>
    export default {
        props:{
            order_id: Number
        },
        mounted () {
            this.unique_order =  new Set(this.order_id);
        },
        data() {
            return {
                unique_order: undefined
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
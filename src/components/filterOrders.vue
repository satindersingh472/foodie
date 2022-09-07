<template>
  <div>
    <div  class="filter">
        <button @click="show_options">Filter</button>
    </div>
    <div v-if="show_filters !== false" class="links">
      <button @click="send_string(`all_orders`,$event)" >All Orders</button>
      <button @click="send_string(`completed_orders`,$event)"  >Completed Orders</button>
      <button @click="send_string(`confirmed_orders`,$event)"  >Confirmed Orders</button>
      <button @click="send_string(`not_completed_orders`,$event)"  >Not Completed Orders</button>
      <button @click="send_string(`not_confirmed_orders`,$event)"  >Not Confirmed Orders</button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        send_string(string){
            this.$emit(`recieve_string`, string);
        },

        show_options() {
            if(this.show_filters === false){
                this.show_filters = true;
            } else if(this.show_filters === true){
                this.show_filters = false
            }
        }
    },
    data() {
        return {
            show_filters: false
        }
    },
}
</script>

<style lang="scss" scoped>
.filter{
    display: grid;
    justify-items: end;
}

</style>

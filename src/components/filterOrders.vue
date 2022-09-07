<template>
  <div>
    <!-- filter orders component will help user filter the types of orders -->
    <div class="main_page">
      <div class="filter">
        <!-- filter button will show options -->
        <button @click="show_options">Filter</button>
      </div>
      <!-- links buttons use send string method and every button is sending some string value -->
      <div v-if="show_filters !== false" class="links">
        <button @click="send_string(`all_orders`, $event)">All Orders</button>
        <button @click="send_string(`completed_orders`, $event)">
          Completed Orders
        </button>
        <button @click="send_string(`confirmed_orders`, $event)">
          Confirmed Orders
        </button>
        <button @click="send_string(`not_completed_orders`, $event)">
          Not Completed Orders
        </button>
        <button @click="send_string(`not_confirmed_orders`, $event)">
          Not Confirmed Orders
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /*send string will recieve string with event and emit thats string with recieve string event */
    send_string(string) {
      this.$emit(`recieve_string`, string)
      this.show_filters = false
    },

    show_options() {
        /*show filters will show and hide div links */
      if (this.show_filters === false) {
        this.show_filters = true
      } else if (this.show_filters === true) {
        this.show_filters = false
      }
    },
  },
  data() {
    return {
      show_filters: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.main_page {
  display: grid;
  justify-items: center;
  .filter{
    button{
        padding: 5px;
    }
  }
  .links{
    display: grid;
    gap: 10px;
  }
}
</style>

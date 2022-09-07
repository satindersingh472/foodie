<template>
  <div v-if="authenticated === true" >
    <page-header></page-header>
    <div>
      <!-- filters component has been used here to choose between options -->
      <filter-orders @recieve_string="use_String"></filter-orders>
    </div>
    <!-- different type of orders can be choosed from following components the filter option's value is coming from filter orders 
    filters orders is emitting that value and display orders is recieving that value by listening to that event through
    the attribute in filter orders component -->
    <view-completed-orders v-if="filter_option === `completed_orders`" ></view-completed-orders>
    <view-confirmed-orders v-if="filter_option === `confirmed_orders`" ></view-confirmed-orders>
    <view-every-order v-if="filter_option === `all_orders`" ></view-every-order>
    <view-not-completed-orders v-if="filter_option === `not_completed_orders`" ></view-not-completed-orders>
    <view-not-confirmed-orders v-if="filter_option === `not_confirmed_orders`" ></view-not-confirmed-orders>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import PageHeader from '@/components/pageHeader.vue'
import FilterOrders from '@/components/filterOrders.vue'
import ViewCompletedOrders from '@/components/viewCompletedOrders.vue'
import ViewConfirmedOrders from '@/components/viewConfirmedOrders.vue'
import ViewEveryOrder from '@/components/viewEveryOrder.vue'
import ViewNotCompletedOrders from '@/components/viewNotCompletedOrders.vue'
import ViewNotConfirmedOrders from '@/components/viewNotConfirmedOrders.vue'
export default {
  components: {
    PageHeader,
    FilterOrders,
    ViewCompletedOrders,
    ViewConfirmedOrders,
    ViewEveryOrder,
    ViewNotCompletedOrders,
    ViewNotConfirmedOrders,
  },
  mounted () {
    /*check if cookies exist */
    if(cookies.get(`token`)){
        this.authenticated = true;
    }
  },
  methods: {
    /*recieving the value for filter options and storing it equal to filter options */
    use_String(string) {
      this.filter_option = string
    },
  },
  data() {
    return {
      filter_option: `all_orders`,
      authenticated: false
    }
  },
}
</script>

<style lang="scss" scoped></style>

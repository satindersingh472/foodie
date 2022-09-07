<template>
  <div v-if="authenticated === true" >
    <page-header></page-header>
    <div>
      <filter-orders @recieve_string="use_String"></filter-orders>
    </div>
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
    if(cookies.get(`token`)){
        this.authenticated = true;
    }
  },
  methods: {
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

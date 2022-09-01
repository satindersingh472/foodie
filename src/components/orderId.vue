<template>
<div>
  <restaurant-header></restaurant-header>
  <div>
    <h1>Order ID: {{detail[`order_id`]}}</h1>
    <h2>Name: {{detail[`name`]}}</h2>
    <p>Complete {{detail[`is_complete`]}}</p>
    <p>Confirm: {{detail[`is_confirmed`]}}</p>
    <confirm-order></confirm-order>
    <complete-order></complete-order>
  </div>
</div>
</template>

<script>
import ConfirmOrder from "@/components/confirmOrder.vue";
import CompleteOrder from "@/components/completeOrder.vue";
import RestaurantHeader from "@/components/restaurantHeader.vue";
export default {
    components: {
        ConfirmOrder,
        CompleteOrder,
        RestaurantHeader
    },
  props: {
  detail: Object
  },
};
</script>

<style lang="scss" scoped></style>

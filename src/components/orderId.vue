<template>
  <div>
    <h1>Order ID: {{detail[`order_id`]}}</h1>
    <h2>Name: {{detail[`name`]}}</h2>
    <p>Complete {{detail[`is_complete`]}}</p>
    <p>Confirm: {{detail[`is_confirmed`]}}</p>
    <confirm-order></confirm-order>
    <complete-order></complete-order>
  </div>
</template>

<script>
import ConfirmOrder from "@/components/confirmOrder.vue";
import CompleteOrder from "@/components/completeOrder.vue";
export default {
    components: {
        ConfirmOrder,
        CompleteOrder
    },
  props: {
  detail: Object
  },
};
</script>

<style lang="scss" scoped></style>

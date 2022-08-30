<template>
  <div class="all_items">
    <div
      class="order_recieved"
      v-for="(order_detail,index) in order_details"
      :key="index"
    >
      <img :src="order_detail[`image_url`]" />
      <h2>{{ order_detail[`name`] }}</h2>
      <p>{{ order_detail[`price`] }}</p>
      <button @click="delete_item(index,$event)" >Remove</button>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  mounted() {
    this.order_details = JSON.parse(cookies.get(`orders`));
  },
  methods: {
    delete_item(index) {
        this.order_details.splice(index,1);
        cookies.set(`orders`,JSON.stringify(this.order_details));
    }
  },
  data() {
    return {
      order_details: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  text-align: center;
  padding: 0px;
  margin: 0px;
}
img {
  height: 250px;
  width: 300px;
  object-fit: cover;
}
.all_items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  .order_recieved {
    display: grid;
    place-items: center;
  }
}
</style>

<template>
  <div class="main_page">
    <div class="all_items">
      <div
        class="order_recieved"
        v-for="(order_detail, index) in order_details"
        :key="index"
      >
        <img :src="order_detail[`image_url`]" />
        <h2>{{ order_detail[`name`] }}</h2>
        <p>{{ order_detail[`price`] }}</p>
        <p>ID: {{order_detail[`id`]}}</p>
        <button @click="delete_item(index, $event)">Remove</button>
      </div>
    </div>
    <div class="place_order">
        <button @click="add_items" >Place Order</button>
        <div v-for="(selected,index) in selected_items" :key="index" >
            <h2>{{selected[`name`]}}</h2>
        </div>
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
      this.order_details.splice(index, 1);
      cookies.set(`orders`, JSON.stringify(this.order_details));
    },
    add_items(){
     for(let i=0;i<this.order_details.length;i++){
      this.selected_items.push(this.order_details[i]);
     }
    }
  },
  data() {
    return {
      order_details: undefined,
      selected_items: undefined
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
.main_page{
    display: grid;
    gap:20px;
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

<template>
  <div class="main_form" >
    <h2>Add Items to the Menu <br> for your Restaurant</h2>
    <div class="form">
      <div class="content_item">
        <h4>Product Name:</h4>
        <input type="text" ref="name" />
      </div>
      <div class="content_item">
        <h4>Product Description:</h4>
        <input type="text" ref="description" />
      </div>
      <div class="content_item">
        <h4>Product Image URL: </h4>
        <input type="url" ref="image_url">
      </div>
      <div class="content_item">
        <h4>Product Price:</h4>
        <input type="text" ref="price">
      </div>
      <button @click="send_request">Add Items</button>
      <p>{{message}}</p>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    send_request() {
      axios
        .request({
          url: ` https://innotechfoodie.ml/api/menu`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
            token: cookies.get(`token`)
          },
          data: {
            description: this.$refs[`description`][`value`],
            image_url: this.$refs[`image_url`][`value`],
            name: this.$refs[`name`][`value`],
            price: this.$refs[`price`][`value`],
          },
        })
        .then((response) => {
          if(response){
            this.message = `Added successfully`;
          }
        })
        .catch((error) => {
          if(error){
            this.message= `item not added`;
          }
        });
    },
  },
  data() {
    return {
      message: undefined
    }
  },
};
</script>

<style lang="scss" scoped>
*{
    padding: 0px;
    margin: 0px;
    text-align: center;
}
.main_form{
    display: grid;
    gap: 20px;
}
.form{
    display: grid;
    gap: 10px;
    .content_item{
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        h4{
            display: grid;
            text-align: start;
        }
    }
}
</style>

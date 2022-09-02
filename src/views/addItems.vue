<template>
<!-- add items components is used for adding menu items on the restaurant side -->
  <div class="main_page" >
  <page-header></page-header>
    <div class="main_form">
      <h2>
        Add Items to the Menu <br />
        for your Restaurant
      </h2>
      <div class="form">
        <!-- this component will gather all the values from these fields i.e from the form and use them as a data for post request -->
        <div class="content_item">
          <h4>Product Name:</h4>
          <input type="text" ref="name" />
        </div>
        <div class="content_item">
          <h4>Product Description:</h4>
          <input type="text" ref="description" />
        </div>
        <div class="content_item">
          <h4>Product Image URL:</h4>
          <input type="url" ref="image_url" />
        </div>
        <div class="content_item">
          <h4>Product Price:</h4>
          <input type="text" ref="price" />
        </div>
        <!-- add items button triggers send request and call the api  -->
        <button @click="send_request">Add Items</button>
        <!-- an appropriate message will be displayed base on the api response -->
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "@/components/pageHeader.vue";
export default {
  components: {
    PageHeader,

  },
  methods: {
    // send request will call the api to add the menu item
    send_request() {
      axios
        .request({
          // endpoint to add new item
          url: ` https://innotechfoodie.ml/api/menu`,
          // post method is used
          method: `POST`,
          // api key and restaurant token is used as headers
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
            token: cookies.get(`token`),
          },
          // all the data will be coming from the values of input fields from the form
          data: {
            description: this.$refs[`description`][`value`],
            image_url: this.$refs[`image_url`][`value`],
            name: this.$refs[`name`][`value`],
            price: this.$refs[`price`][`value`],
          },
        })
        .then((response) => {
          if (response) {
            // if response is successfull then the following value will get displayed as a message
            this.message = `Added successfully`;
          }
        })
        .catch((error) => {
          if (error) {
            // if error shows up then following message will get displayed on the page
            this.message = `item not added`;
          }
        });
    },
  },
  data() {
    return {
      message: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}
.main_form {
  display: grid;
  gap: 20px;
}
.form {
  display: grid;
  gap: 10px;
  .content_item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    h4 {
      display: grid;
      text-align: start;
    }
  }
}
</style>

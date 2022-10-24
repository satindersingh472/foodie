<template>
  <div>
    <!-- edit profile image is just for editing the profile image of a client -->
    <div>
      <div>
        <!-- edit will trigger the edit button method and show the div with input field -->
        <button @click="edit_button">edit</button>
        <!-- save button will send the request to change profile image -->
        <button v-if="edit_clicked === true" @click="send_request">Save</button>
      </div>
      <!-- if edit clicked is true a div will be on the page with p tag for changing picture and input field to put the url of a new image  -->
      <div v-if="edit_clicked === true">
        <p>Change picture</p>
        <input type="url" ref="image_url" />
      </div>
<!-- a message will be shown on the basis of api response  -->
      <div v-if="message !== undefined">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    // edit method is to popup a div to put the value of a new image url 
    edit_button() {
      this.edit_clicked = true;
    },
// send request will send the api request and hide the div
    send_request() {
        this.edit_clicked = false;
      axios
        .request({
          // endpoint for changing the profile image for client
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          // patch method is used
          method: `PATCH`,
          // headers required are api key and token from client authentication
          headers: {
            token: cookies.get(`token`)
          },
          // data required is just the image url
          data: {
            image_url: this.$refs[`image_url`][`value`],
          },
        })
        .then((response) => {
          if (response) {
            // if reponse is success then following value will be displayed on the page after hitting save
            this.message = `change successfull`;
          }
        })
        .catch((error) => {
          if (error) {
            // if error exists then following value will be dispalyed on the page
            this.message = `error! in changing`;
          }
        });
    },
  },
  data() {
    return {
      message: undefined,
      image_url: undefined,
      edit_clicked: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>

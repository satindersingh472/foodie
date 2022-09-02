<template>
  <div>
    <!-- edit profile is for client side profile  -->
    <!-- it will just show a message but actually it will call an api to make changes and show the appropriate message from the 
    following to the page according to the conditions -->
    <h2 v-if="message === true">profile changed successfull</h2>
    <h2 v-else-if="message === false">Changes not applied</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
     mounted () {
      // on mounted the edit profile will listen to the send details and trigger the  make changes method
      // the make changes method will then grab the details that came along with the send details event from the 
      // other page and use them as a data object for the patch request
      this.$root.$on(`send_details`, this.make_changes);
    },
  methods: {
    // make changes will call api and send the request to change the profile
 make_changes(details) {
      this.details = details;
      axios
        .request({
          // endpoint for changing the profile or make changes to the profile
          url: `https://innotechfoodie.ml/api/client`,
          // patch request is used for this endpoint
          method: `PATCH`,
          // api key and token came with authentication of a client will be used as headers
          headers: {
            'x-api-key': `TVTZDiQZDzjkWqVkNCxr`,
            token: cookies.get(`token`)
          },
          // data is sent to be changed
          data:{
            first_name: this.details[`first_name`],
            last_name: this.details[`last_name`],
            email: this.details[`email`],
            username: this.details[`username`],
            password: this.details[`password`],
          }
        })
        .then((response) => {
         if(response){
          // if there is a response then message is true and show something based on its value in the html
          this.message = true;
         }
        })
        .catch((error) => {
          if(error){
            // if there is an error then message is false and message is shown according to that
            this.message = false
          }
        });
    },
  },
  data() {
    return {
      message: undefined,
  details: undefined
    };
  },
};
</script>

<style lang="scss" scoped></style>

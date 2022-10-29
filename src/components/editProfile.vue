<template>
  <div>
    <!-- edit profile is for client side profile  -->
    <!-- it will just show a message but actually it will call an api to make changes and show the appropriate message from the 
    following to the page according to the conditions -->
    <h2 v-if="message !== undefined">{{message}}</h2>
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
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          // patch request is used for this endpoint
          method: `PATCH`,
          // api key and token came with authentication of a client will be used as headers
          headers: {
            token: cookies.get(`token`)
          },
          // data is sent to be changed
          data:{
            first_name: this.details[`first_name`],
            last_name: this.details[`last_name`],
            email: this.details[`email`],
            username: this.details[`username`]
          }
        })
        .then((response) => {
         this.message = response['data']
        })
        .catch((error) => {
          this.message = error['response']['data']
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

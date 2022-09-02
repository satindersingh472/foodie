<template>
  <div>
    <!-- rest edit profile will call the api to make changes to the profile of a restaurant -->
    <p v-if="message !== undefined">{{message}}</p>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
    mounted () {
      // on mounting this component will listen for the send edit event and 
      // trigger the send request method with details came along the send edit event
        this.$root.$on(`send_edit`,this.send_request);
    },
  methods: {
    // send request method will call the api and make changes to the restaurant profile
    send_request(details) {
        this.details = details
      axios
        .request({
          // endpoint url for making changes to restaurant profile
          url: ` https://innotechfoodie.ml/api/restaurant`,
          // patch method is used
          method: `PATCH`,
          // api key and restaurant authentication token is used as headers
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`),
          },
          // all of the following data was emiited by the other component 
          // with the event send edit and details
          data: {
            name: this.details[`name`],
            address: this.details[`address`],
            city: this.details[`city`],
            email: this.details[`email`],
            phone_number: this.details[`phone_number`], 
            bio: this.details[`bio`],
            password: this.details[`password`],
            profile_url: this.details[`profile_url`],
            banner_url: this.details[`banner_url`],
          },
        })
        .then((response) => {
          if (response) {
            // if response is successfull then following value will get displayed as a message
            this.message = `profile changed successfully`;
          }
        })
        .catch((error) => {
          if (error) {
            // if there is an error then following message will displayed 
            this.message =`error in changing`;
          }
        });
    },
  },
  data() {
    return {
      details: undefined,
      message: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
  display: grid;
  place-items: center;
  gap: 20px;
}
img {
  height: 100px;
  width: 100%;
}
.content_item {
  display: grid;
  text-align: center;
  background-color: beige;
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.logo,
.banner {
  display: grid;
  grid-auto-flow: column;
}
</style>

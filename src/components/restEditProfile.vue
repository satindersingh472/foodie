<template>
  <div>
    <p v-if="message !== undefined">{{message}}</p>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
    mounted () {
        this.$root.$on(`send_edit`,this.send_request);
    },
  methods: {
    send_request(details) {
        this.details = details
      axios
        .request({
          url: ` https://innotechfoodie.ml/api/restaurant`,
          method: `PATCH`,
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`),
          },
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
            this.message = `profile changed successfully`;
          }
        })
        .catch((error) => {
          if (error) {
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

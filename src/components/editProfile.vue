<template>
  <div>
    <h2 v-if="message === true">profile changed successfull</h2>
    <h2 v-else-if="message === false">Changes not applied</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
     mounted () {
      this.$root.$on(`send_details`, this.make_changes);
    },
  methods: {
 make_changes(details) {
      this.details = details;
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          method: `PATCH`,
          headers: {
            'x-api-key': `TVTZDiQZDzjkWqVkNCxr`,
            token: cookies.get(`token`)
          },
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
          this.message = true;
         }
        })
        .catch((error) => {
          if(error){
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

<template>
  <div class="change_profile">
    <h2>New First Name: <input type="text" ref="first_name"  /></h2>
    <h2>New Last Name: <input type="text" ref="last_name" /></h2>
    <h2>New User Name: <input type="text" ref="username" /></h2>
    <h2>New Email: <input type="text" ref="email" /></h2>
    <h2>New Profile Image: <input type="file" ref="file" /></h2>
    <h2>New Password <input type="text" ref="password" /></h2>
    <button @click="make_changes">Submit Changes</button>
    <h2 v-if="message !== undefined">{{message}}</h2>
    <h2 v-else>error</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    make_changes() {
      this.email = this.$refs[`email`][`value`];
      this.password = this.$refs[`password`][`value`];
      this.username = this.$refs[`username`][`value`];
      this.file = this.$refs[`file`][`value`];
      this.first_name = this.$refs[`first_name`][`value`];
      this.last_name = this.$refs[`last_name`][`value`];
      this.password = this.$refs[`password`][`value`];
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          method: `PATCH`,
          headers: {
            'x-api-key': `TVTZDiQZDzjkWqVkNCxr`,
            token: cookies.get(`token`)
          },
          data:{
            last_name: this.last_name
          }
        })
        .then((response) => {
          this.message = response;
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
      email: undefined,
      password: undefined,
      username: undefined,
      file: undefined,
      first_name: undefined,
      last_name: undefined,
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped></style>

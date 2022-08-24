<template>
  <div>
    <div class="registration">
      <div class="form">
        <div class="information">
          <label for="username">User Name</label>
          <input type="text" ref="username" placeholder="username" />
          <label for="password">Password</label>
          <input type="text" ref="password" placeholder="password" />

          <label for="first_name">First Name</label>
          <input type="text" ref="first_name" placeholder="first name" />
          <label for="last_name">Last Name</label>
          <input type="text" ref="last_name" placeholder="last_name" />
       
           <label for="email">Email</label>
          <input type="text" ref="email" placeholder="Email" />
          <label for="file">Upload Image</label>
          <input type="file" ref="file" />
        </div>
          <button @click="signup">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    signup() {
      this.email = this.$refs[`email`][`value`];
      this.password = this.$refs[`password`][`value`];
      this.username = this.$refs[`username`][`value`];
      this.file = this.$refs[`file`][`value`];
      this.first_name = this.$refs[`first_name`][`value`];
      this.last_name = this.$refs[`last_name`][`value`];
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          },
          data: {
            email: this.email,
            password: this.password,
            username: this.username,
            image_url: this.file,
            first_name: this.first_name,
            last_name: this.last_name,
          },
        })
        .then((response) => {
          response;
          this.token = response[`data`][`token`];
          cookies.set(`token`, this.token);
          this.client_id = response[`data`][`client_id`];
          cookies.set(`client_id`,this.client_id);
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
      token: undefined,
      client_id: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  border: 2px solid black;
  margin: auto;
  width: 60vw;
  text-align: center;
  display: grid;
  gap: 20px;
  place-items: center;
  .information {
    display: grid;
    padding: 20px;
    margin: 20px;
    grid-template-columns: 1fr 1fr;
    justify-items: start;
    gap: 20px;
    place-items: center;
    label{
      justify-self: end;
    }
    input{
      justify-self: start;
    }
  }
}
</style>

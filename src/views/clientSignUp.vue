<template>
  <div class="main_sign_up_form">
    <page-header></page-header>
    <div class="registration">
      <h2>Register as a Client</h2>
      <div class="form">
        <div class="information">
          <div>
            <p>User Name</p>
            <input type="text" ref="username" placeholder="username" />
          </div>
          <div>
            <p>Password</p>
            <input type="text" ref="password" placeholder="password" />
          </div>
          <div>
            <p>First Name</p>
            <input type="text" ref="first_name" placeholder="first name" />
          </div>
          <div>
            <p>Last Name</p>
            <input type="text" ref="last_name" placeholder="last_name" />
          </div>
        </div>
        <div class="email">
          <p>Email</p>
          <input type="text" ref="email" placeholder="Email" />
        </div>
        <div class="image">
          <p>Profile Image</p>
          <input type="url" ref="file">
        </div>
        <button @click="signup">REGISTER</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import pageHeader from "@/components/pageHeader.vue";
export default {
  components: {
    pageHeader,
  },
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
          cookies.set(`client_id`, this.client_id);
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
.registration {
  text-align: center;
}
.form {
  width: 100%;
  display: grid;
  place-items: center;
  gap: 15px;
  button {
    width: 100%;
    margin: 10px;
    border-radius: 5px;
    background-color: red;
    color: white;
    font: 1.2rem white;
    font-family: "Courier New", Courier, monospace;
  }
  .information {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    div {
      display: grid;
      place-items: start;
      p {
        align-self: end;
        justify-self: start;
        margin: 5px 0px 5px 0px;
        font-size: 0.8rem;
      }
      input {
        width: 100%;
        gap: 10px;
        justify-self: center;
        border: 2px solid black;
        border-radius: 5px;
      }
    }
  }
  .email,.image {
    display: grid;
    place-items: start;
    width: 100%;
    p {
      margin: 5px 0px 5px 0px;
      font-size: 0.8rem;
    }
    input {
      width: 100%;
      justify-self: center;
      border: 2px solid black;
      border-radius: 5px;
    }
  }
}
</style>

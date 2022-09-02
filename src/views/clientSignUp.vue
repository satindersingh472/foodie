<template>
<!-- client signup component is for registering the client -->
  <div class="main_sign_up_form">
    <foodie-header></foodie-header>
    <div class="registration">
      <h2>Register as a Client</h2>
      <!-- if already a user there is a login link  -->
      <p>Already a User?<router-link to="client_login">LogIn</router-link></p>
      <div class="form">
        <div class="information">
          <!-- this form will have all the input fields required to signup  -->
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
        <!-- register button will call the api-->
        <button @click="signup">REGISTER</button>
        <p v-if="message !== undefined">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import FoodieHeader from '@/components/foodieHeader.vue';
export default {
  components: {
    FoodieHeader,
  },
  methods: {
    signup() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          },
          data: {
            email: this.$refs[`email`][`value`],
            password: this.$refs[`password`][`value`],
            username: this.$refs[`username`][`value`],
            image_url: this.$refs[`image_url`][`value`],
            first_name: this.$refs[`first_name`][`value`],
            last_name: this.$refs[`last_name`][`value`]
          },
        })
        .then((response) => {
          cookies.set(`token`, response[`data`][`token`]);
          cookies.set(`client_id`, response[`data`][`client_id`]);
          this.$router.push(`/discover_restaurants`);
        })
        .catch((error) => {
          if(error[`response`][`status`] === 409 ){
            this.message = `User Already Exists`;
          } else if(error) {
            this.message = `Please fill out all the Required fields`;
          }
        });
    },
  },
  data() {
    return {
      message: undefined
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

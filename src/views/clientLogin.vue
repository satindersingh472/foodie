<template>
  <div class="background">
    <div class="main_login" ref="main_login">
      <foodie-header></foodie-header>
      <h1>Login as a Customer</h1>
      <div class="login_form">
        <input type="text" ref="email" placeholder="Enter Your Email" />
        <input type="text" ref="password" placeholder="Enter your Password" />
        <button @click="login">LOGIN</button>
        <h3>Don't have an account?</h3>
        <h2>
          <router-link class="links" to="/client_sign_up"
            >Register Here</router-link
          >
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import FoodieHeader from "@/components/foodieHeader.vue";
export default {
  components: {
    FoodieHeader,
  },
  methods: {
    login() {
      this.email = this.$refs[`email`][`value`];
      this.password = this.$refs[`password`][`value`];
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-login`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          },
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          cookies.set(`client_id`, response[`data`][`client_id`]);
          cookies.set(`token`, response[`data`][`token`]);
          this.$router.push(`/discover_restaurants`);
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Gluten:wght@100;200;300;400;600;700;900&family=Judson:ital,wght@0,400;0,700;1,400&display=swap");
* {
  display: grid;
  place-items: center;
  font-family: judson, serif;
  margin: 0px;
  padding: 0px;
}
.background {
  height: 100vh;
  display: grid;
  background-image: url("https://scontent.fyxd1-1.fna.fbcdn.net/v/t39.30808-6/301605385_5279066088874619_1245101606464892837_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=R4uNb8169egAX8DUMTQ&tn=mVxbMzcvfvEBb-wK&_nc_ht=scontent.fyxd1-1.fna&oh=00_AT8Kj91euDnGTMG-jmc_CzV1Odgg4XjnV-ejg9MRt2gfOg&oe=630E185B");
  background-repeat: no-repeat;
  background-size: cover;
}
.main_login {
  height: 20vh;
  align-self: start;
  padding-top: 30px;
  display: grid;
  gap: 30px;
}
.login_form {
  align-self: start;
  display: grid;
  gap: 10px;
  input[type="text"] {
    width: 70vw;
    padding: 10px;
    border-radius: 15px;
    background-color: #b0cad8;
    font-size: 1.8rem;
  }
  .links {
    color: blue;
  }
  button {
    padding: 10px;
    width: 30vw;
    border-radius: 15px;
    background-color: #f79797;
  }
}
</style>

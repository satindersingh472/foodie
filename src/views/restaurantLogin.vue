<template>
  <div>
    <!-- restaurant login component is for login as a restaurant -->
    <div v-if="hide_fields === true">
      <!-- will show a restaurant profile if logged in -->
      <restaurant-profile> </restaurant-profile>
    </div>
    <div v-if="hide_fields === false" >
        <div class="main_login" ref="main_login">
          <foodie-header></foodie-header>
          <h1>Login as a Restaurant</h1>
          <div class="login_form">
            <input type="text" ref="email" placeholder="Enter Your Email" />
            <input type="text" ref="password" placeholder="Enter your Password"/>
            <button @click="login">LOGIN</button>
            <h3>Don't have an account?</h3>
            <h2>
              <router-link class="links" to="/restaurant_sign_up">Register Here</router-link>
            </h2>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import FoodieHeader from "@/components/foodieHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";
import RestaurantProfile from "@/views/restaurantProfile.vue";
export default {
  components: {
    FoodieHeader,
    RestaurantProfile,
  },
    mounted() {
      if (cookies.get(`restaurant_id`) && cookies.get(`token`)) {
        this.hide_fields = true;
      }
    },
  methods: {
    login() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant-login`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          },
          data: {
            email: this.$refs[`email`][`value`],
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
          if (response) {
            cookies.set(`token`, response[`data`][`token`]);
            cookies.set(`restaurant_id`, response[`data`][`restaurantId`]);
            this.authenticated();
          }
        })
        .catch((error) => {
          if(error){
            this.message = `Invalid Email or Password`;
          }
        });
    },
    authenticated() {
      if (cookies.get(`token`) && cookies.get(`restaurant_id`) !== undefined) {
        this.$router.push(`/restaurant_profile`);
      }
    },
  },
  data() {
    return {
      hide_fields: false,
      message: undefined
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
  width: 100%;
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

<template>
  <div class="main_page">
    <!-- restaurant login component is for login as a restaurant -->
    <!-- will show a restaurant profile if logged in -->
    <restaurant-profile class="restaurant_component" v-if="hide_fields === true"></restaurant-profile>
    <div  class="login_page" v-if="hide_fields === false">
      <div class="main_login" ref="main_login">
        <foodie-header></foodie-header>
        <h1 class="heading_form">Login as a Restaurant</h1>
        <div class="login_form">
          <input type="text" ref="email" placeholder="Enter Your Email" />
          <input type="text" ref="password" placeholder="Enter your Password" />
          <!-- login button will trigger the login method which 
            will further call the api -->
          <button @click="login">LOGIN</button>
            </div>
          <div class="sign_up_links">
            <h3>Don't have an account?</h3>
            <h2>
              <!-- if the user do not have an account the following router link will
              take the user to the register as a restaurant page -->
              <router-link class="links" to="/restaurant_sign_up">
                Register Here
              </router-link>
            </h2>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import FoodieHeader from '@/components/foodieHeader.vue'
import axios from 'axios'
import cookies from 'vue-cookies'
import RestaurantProfile from '@/views/restaurantProfile.vue'
export default {
  components: {
    FoodieHeader,
    RestaurantProfile,
  },
  mounted() {
    // if user authenticated already then restaurant profile will be shown to the user
    if (cookies.get(`restaurant_id`) && cookies.get(`token`)) {
      this.hide_fields = true
    }
  },
  methods: {
    login() {
      axios
        .request({
          // endpoint for the post method to authenticate the user
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant_login`,
          method: `POST`,
          data: {
            // email and password sent as data
            email: this.$refs[`email`][`value`],
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
            // if response is successfull then cookies are set
            // token and restaurant id cookies will be used for authentication
            cookies.set(`token`, response[`data`][`token`])
            cookies.set(`restaurant_id`, response[`data`][`restaurant_id`])
            // authenticated function will get called after success
            this.authenticated()
        })
        .catch((error) => {
          if (error) {
            // if error then the following message will appear on the page
            this.message = `Invalid Email or Password`
          }
        })
    },
    authenticated() {
      // authenticated method will check for the cookies
      // and direct the user towards restaurant profile
      if (cookies.get(`token`) && cookies.get(`restaurant_id`) !== undefined) {
        this.$router.push(`/restaurant_profile`)
      }
    },
  },
  data() {
    return {
      hide_fields: false,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Gluten:wght@100;200;300;400;600;700;900&family=Judson:ital,wght@0,400;0,700;1,400&display=swap');
* {
  display: grid;
  text-align: center;
  font-family: judson, serif;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.main_page{
  display: grid;
}
.main_login {
  display: grid;
  gap: 8vh;
  justify-self: center;
  .heading_form {
    font-size: 1.2rem;
  }
  .login_form {
    gap: 3vh;
    input[type='text'] {
      font-size: 1.5rem;
      text-align: center;
      padding: 5px 0px;
      border-radius: 15px;
      background-color: #b0cad8;
    }
    button {
      font-size: 1.2rem;
      padding: 10px;
      border-radius: 15px;
      background-color: #f79797;
    }
  }
   .sign_up_links {
      .links {
        color: blue;
        text-decoration: none;
      }
   }
}
@media only screen and (min-width:400px){
  .main_login{
    width: 350px;
  }
}
</style>

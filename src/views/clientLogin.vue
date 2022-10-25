<template>
  <div class="main_page">
    <!-- client login component is to display the login page on the client side -->
    <discover-restaurants v-if="cookies_exist === true"></discover-restaurants>
    <div v-if="cookies_exist === false" class="login_page">
      <div class="main_login" ref="main_login">
        <foodie-header></foodie-header>
        <h1 class="heading">Login as a Client</h1>
        <div class="login_form">
          <!-- input fields will have value of email and password 
        and from these fields the value will be sent to the api data and token and client id will be returned back -->
          <input type="text" ref="email" placeholder="Enter Your Email" />
          <input type="text" ref="password" placeholder="Enter your Password" />
          <!-- login button will grab the values and send the api request to get the token and id -->
          <button @click="login">LOGIN</button>
          <h2 v-if="message !== undefined">{{ message }}</h2>
        </div>
        <div class="sign_up_links">
          <h3>Don't have an account?</h3>
          <h2>
            <!-- if user wants to create an account the this router link will route to the login page -->
            <router-link class="links" to="/client_sign_up">
              Register Here
            </router-link>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import FoodieHeader from '@/components/foodieHeader.vue'
import DiscoverRestaurants from '@/views/discoverRestaurants.vue'
export default {
  components: {
    FoodieHeader,
    DiscoverRestaurants,
  },
  mounted() {
    if (cookies.get(`client_id`) && cookies.get(`token`)) {
      this.cookies_exist = true
    } else {
      this.cookies_exist = false
    }
  },
  methods: {
    // login method will call the api
    login() {
      this.email = this.$refs[`email`][`value`]
      this.password = this.$refs[`password`][`value`]
      axios
        .request({
          // endpoint to send the post request for login
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client-login`,
          // post method is used
          method: `POST`,
          // email and password is sent as a data
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          // if response is successfull then cookies are set named
          // client id and token for authentication
          cookies.set(`client_id`, response[`data`][`client_id`])
          cookies.set(`token`, response[`data`][`token`])
          // after the authentication is done then user to routed to the discover restaurants page
          this.$router.push(`/discover_restaurants`)
        })
        .catch((error) => {
          if (error) {
            this.message = `Email or Password is invalid`
          }
          // if there is an error in authentication then the below message will display an error
        })
    },
  },
  data() {
    return {
      email: undefined,
      password: undefined,
      message: undefined,
      cookies_exist: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Gluten:wght@100;200;300;400;600;700;900&family=Judson:ital,wght@0,400;0,700;1,400&display=swap');
* {
  display: grid;
  font-family: judson, serif;
  margin: 0px;
  padding: 0px;
  width: 100%;
  text-align: center;
}
.login_page {
  display: grid;
  place-items: center;
  .main_login {
    display: grid;
    gap: 8vh;
    .heading {
      font-size: 1.2rem;
    }
    .login_form {
      align-self: start;
      display: grid;
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
}
@media only screen and (min-width:500px){
  .main_login{
    width: 500px;
    text-align: center;
  }
}
</style>

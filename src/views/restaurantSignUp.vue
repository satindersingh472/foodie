<template>
<div class="main_page">
<!-- restaurant sign up component will be used to allow a restaurant user to create a new restaurant -->
<restaurant-profile v-if="cookies_exist === true"></restaurant-profile>
  <div v-if="cookies_exist === false" class="main_signup">
    <foodie-header></foodie-header>
    <h1 class="heading_form" >Register as a Restaurant</h1>
    <!-- if already have an account the below router link
    will take the user to the restaurant login page -->
    <h3 class="question" >Already have an account? <router-link class="links" to="/restaurant_login">LogIn</router-link></h3>
    <div class="form">
      <div class="content_item">
        <p>Name</p>
        <input type="text" placeholder="Restaurant's name" ref="name" />
      </div>
      <div class="content_item">
        <p>Address</p>
        <input type="url" placeholder="Restaurant's address" ref="address" />
      </div>
      <div class="content_item">
        <p>City</p>
        <input type="text" placeholder="city" ref="city" />
      </div>
      <div class="content_item">
        <p>Phone Number</p>
        <input type="tel" placeholder="phone" ref="phone_number" />
      </div>
    </div>
    <div class="content_item">
      <p>Email</p>
      <input type="text" placeholder="email" ref="email" />
    </div>
    <div class="content_item">
      <p>Password</p>
      <input type="password" placeholder="password" ref="password" />
    </div>
    <div class="content_item">
      <p>Bio</p>
      <textarea ref="bio" name="textarea"></textarea>
    </div>
    <div class="content_item">
      <p>Profile URL</p>
      <input type="url" placeholder="profile URL" ref="profile_url" />
    </div>
    <div class="content_item">
      <p>Banner URL</p>
      <input type="url" placeholder="banner URL" ref="banner_url" />
    </div>
    <!-- Register button will trigger the send request method  -->
   <button class="submit" @click="send_request">Register</button>
   <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import FoodieHeader from "@/components/foodieHeader.vue";
import RestaurantProfile from "@/views/restaurantProfile.vue";
export default {
  components: {
    FoodieHeader,
    RestaurantProfile,
  },
  mounted () {
    if(cookies.get(`restaurant_id`) && cookies.get(`token`)){
      this.cookies_exist = true;
    } else {
      this.cookies_exist = false;
    }
  },
  methods: {
    /*send request method will call the api */
    send_request() {
      axios
        .request({
          /*endpoint url for post method */
          url: `https://innotechfoodie.ml/api/restaurant`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          },
          data: {
            /*data is grabbed  from the input fields  */
            name: this.$refs[`name`][`value`],
            address: this.$refs[`address`][`value`],
            city: this.$refs[`city`][`value`],
            phone_number: this.$refs[`phone_number`][`value`],
            email: this.$refs[`email`][`value`],
            password: this.$refs[`password`][`value`],
            bio: this.$refs[`bio`][`value`],
            profile_url: this.$refs[`profile_url`][`value`],
            banner_url: this.$refs[`banner_url`][`value`]
          },
        })
        .then((response) => {
          if(response){
            /* if response is successfull then the user will 
            get token and restaurant id in return and which will 
            be used for authetication purposes */
            cookies.set(`restaurant_id` , response[`data`][`restaurantId`]);
            cookies.set(`token`, response[`data`][`token`]);
            /*the user will sent to restaurant profile page */
              this.$router.push(`/restaurant_profile`);
          }
        })
        .catch((error) => {
          if(error){
            this.message = `Error Registering the Restaurant.`
          }
        });
    },
  },
  data() {
    return {
      cookies_exist: false,
      details: undefined,
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
.main_signup {
  display: grid;
  gap: 20px;
  place-items: center;
  .question{
    font-size: 1.2rem;
  }
  .links{
  color: #f79797;
}
  .heading_form{
    font-size: 1.5rem;
  }
  .submit {
    background-color: #f79797;
    padding: 10px;
    border-radius: 10px;
  }
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  place-items: center;
  gap: 20px;
  font-family: judson, serif;
}
.content_item {
  width: 100%;
  display: grid;
  place-items: center;
  p {
    justify-self: start;
    padding: 5px;
    font-size: 1.2rem;
  }
  input,
  textarea {
    font-size: 0.8rem;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    padding: 10px 0px;
    background-color: #b0cad8;
  }
}

</style>

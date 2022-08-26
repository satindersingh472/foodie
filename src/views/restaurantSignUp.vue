<template>
  <div class="main_signup">
    <foodie-header></foodie-header>
    <div class="form">
      <div class="content_item">
        <p>Name</p>
        <input type="text" placeholder="Restaurant's name" ref="name" />
      </div>
      <div class="content_item">
        <p>Addess</p>
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
   <button class="submit" @click="send_request">Register</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import foodieHeader from "@/components/foodieHeader.vue";
export default {
  components: {
    foodieHeader,
  },
  methods: {
    send_request() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant`,
          method: `POST`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
          },
          data: {
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
            cookies.set(`restaurant_id` , response[`data`][`restaurantId`]);
            cookies.set(`token`, response[`data`][`token`]);
          }
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
      details: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Gluten:wght@100;200;300;400;600;700;900&family=Judson:ital,wght@0,400;0,700;1,400&display=swap");
* {
  padding: 0px;
  margin: 0px;
}
.main_signup {
  display: grid;
  gap: 20px;
  place-items: center;
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
  }
  input,
  textarea {
    font-size: 0.8rem;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    padding: 10px 0px;
  }
}
</style>

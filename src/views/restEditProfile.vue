<template>
  <div>
    <h2>Edit the profile of your Restaurant</h2>
    <div class="form">
      <div class="content_item">
        <p>Name: {{ current_details[`name`] }}</p>
        <h4>
          New Name:<input
            type="text"
            ref="name"
            :value="`${current_details[`name`]}`"
          />
        </h4>
      </div>
      <div class="content_item">
        <p>Address: {{ current_details[`address`] }}</p>
        <h4>
          New Address:<input
            type="text"
            ref="address"
            :value="`${current_details[`address`]}`"
          />
        </h4>
      </div>
      <div class="content_item">
        <p>City:{{ current_details[`city`] }}</p>
        <h4>
          New City:
          <input type="text" ref="city" :value="`${current_details[`city`]}`" />
        </h4>
      </div>
      <div class="content_item">
        <p>Email:{{ current_details[`email`] }}</p>
        <h4>
          New Email:<input
            type="text"
            ref="email"
            :value="`${current_details[`email`]}`"
          />
        </h4>
      </div>
      <div class="content_item">
        <p>Phone:{{ current_details[`phone_number`] }}</p>
        <h4>
          New Phone:<input
            type="text"
            ref="phone_number"
            :value="`${current_details[`phone_number`]}`"
          />
        </h4>
      </div>
      <div class="content_item">
        <p>Bio:{{ current_details[`bio`] }}</p>
        <h4>
          New Bio:
          <textarea
            type="text"
            ref="bio"
            :value="`${current_details[`bio`]}`"
          ></textarea>
        </h4>
      </div>
      <div class="content_item">
        <p>Password: Current Password</p>
        <h4>New Password:<input type="text" ref="password" /></h4>
      </div>
    </div>
    <div class="logo">
      <div class="old_logo">
        <p>Current logo</p>
        <img
          :src="current_details[`profile_url`]"
          :alt="`logo of ${current_details[`profile_url`]}`"
        />
      </div>
      <div class="new_logo">
        <p>New Logo</p>
        <input
          type="url"
          ref="profile_url"
          :value="`${current_details[`profile_url`]}`"
        />
      </div>
    </div>
    <div class="banner">
      <div class="old_banner">
        <p>Current Banner</p>
        <img
          :src="current_details[`banner_url`]"
          :alt="`banner for ${current_details[`banner_url`]}`"
        />
      </div>
      <div class="new_banner">
        <p>New Banner</p>
        <input
          type="url"
          ref="banner_url"
          :value="`${current_details[`banner_url`]}`"
        />
      </div>
    </div>
    <button @click="send_request">Save Changes</button>
    <p v-if="message === true">Profile changes applied</p>
    <p v-if="message === false">Profile changes not applied!!</p>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  mounted() {
    this.current_details = cookies.get(`details`);
  },
  methods: {
    send_request() {
      axios
        .request({
          url: ` https://innotechfoodie.ml/api/restaurant`,
          method: `PATCH`,
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`),
          },
          data: {
            name: this.$refs[`name`][`value`],
            address: this.$refs[`address`][`value`],
            city: this.$refs[`city`][`value`],
            email: this.$refs[`email`][`value`],
            phone_number: this.$refs[`phone_number`][`value`],
            bio: this.$refs[`bio`][`value`],
            password: this.$refs[`password`][`value`],
            profile_url: this.$refs[`profile_url`][`value`],
            banner_url: this.$refs[`banner_url`][`value`],
          },
        })
        .then((response) => {
          if (response) {
            this.message = true;
            this.$router.push('/restaurant_profile')
          }
        })
        .catch((error) => {
          if (error) {
            this.message = false;
          }
        });
    },
  },
  data() {
    return {
      current_details: undefined,
      message: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
  display: grid;
  place-items: center;
  gap: 20px;
}
img {
  height: 100px;
  width: 100%;
}
.content_item {
  display: grid;
  text-align: center;
  background-color: beige;
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.logo,
.banner {
  display: grid;
  grid-auto-flow: column;
}
</style>

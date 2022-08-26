<template>
  <div class="main_page">
    <page-header></page-header>
    <div class="form">
      <div class="form_header">
        <div>
          <h2>Profile</h2>
          <div v-if="profile_clicked === false">
            <p @click="change_profile_picture" class="edit_profile">
              <em>edit profile picture</em>
            </p>
          </div>
          <div v-else-if="profile_clicked === true">
            <input
              type="url"
              ref="image_url"
              :value="`${details[`image_url`]}`"
            />
          </div>
        </div>
        <div class="image">
          <img
            class="img"
            :src="details[`image_url`]"
            :alt="`image of ${details[`first_name`]}`"
          />
        </div>
      </div>
      <div class="form_data">
        <div class="content_item">
          <p>First Name</p>
          <input
            type="text"
            :value="`${details[`first_name`]}`"
            ref="first_name"
          />
        </div>
        <div class="content_item">
          <p>Last Name</p>
          <input
            type="text"
            :value="`${details[`last_name`]}`"
            ref="last_name"
          />
        </div>
        <div class="content_item">
          <p>Email</p>
          <input type="text" :value="`${details[`email`]}`" ref="email" />
        </div>
        <div class="content_item">
          <p>User Name</p>
          <input type="text" :value="`${details[`username`]}`" ref="username" />
        </div>
        <div class="content_item">
          <p>Password</p>
          <input
            type="text"
            ref="password"
            placeholder="enter password to save changes"
          />
        </div>
        <!-- <div class="content_item">
          <p>Image</p>
          <input type="url" :value="`${details[`image_url`]}`" ref="image_url" />
        </div> -->
      </div>
      <button @click="send_info">Save</button>
      <edit-profile></edit-profile>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "@/components/pageHeader.vue";
import EditProfile from "@/components/editProfile.vue";
export default {
  components: {
    PageHeader,
    EditProfile,
  },
  methods: {
    change_profile_picture() {
      this.profile_clicked = true;
    },
    send_info() {
      this.details[`first_name`] = this.$refs[`first_name`][`value`];
      this.details[`last_name`] = this.$refs[`last_name`][`value`];
      this.details[`email`] = this.$refs[`email`][`value`];
      this.details[`username`] = this.$refs[`username`][`value`];
      this.details[`password`] = this.$refs[`password`][`value`];
      this.details[`image_url`] = this.$refs[`image_url`][`value`];
      this.$root.$emit(`send_details`, this.details);
    },
  },
  mounted() {
    this.profile_clicked = false;

    axios
      .request({
        url: `https://innotechfoodie.ml/api/client`,
        headers: {
          "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
        },
        params: {
          client_id: cookies.get(`client_id`),
        },
      })
      .then((response) => {
        this.details = response[`data`][0];
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      details: undefined,
      show_edit: true,
      profile_clicked: false,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.main_page {
  display: grid;
  text-align: center;
place-items: center;
}
.form {
    border: 2px solid black;
    padding: 5px;
  display: grid;
  gap: 20px;
  width: 100%;
  button {
    display: grid;
    justify-self: center;
    padding: 10px;
  }
}
.form_data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  .content_item {
    display: grid;
    margin-top: 40px;
    p {
      justify-self: start;
      margin: 10px 5px 5px 0px;
    }
    input {
      padding: 10px;
      border: 1px solid black;
      background-color: #b0cad9;
    }
  }
}
.form_header {
  display: grid;
  background-color: #b0cad9;
  width: 100%;
  height: 100px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  div {
    align-items: center;
    h2 {
      display: grid;
    }
  }
  .image {
    display: grid;
    border: 2px solid black;
    justify-self: end;
    height: 75px;
    width: 75px;
    padding: 10px;
    .img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
@media only screen and (min-width: 600px) {
  .form {
    width: 50vw;
  }
}
</style>

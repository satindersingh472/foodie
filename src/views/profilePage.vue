<template>
  <div class="main_page">
    <page-header></page-header>
    <div class="form">
      <div class="form_header">
        <div>
          <h2>Profile</h2>
        </div>
        <div class="image">
          <edit-profile-image class="edit_button"></edit-profile-image>
          <img
            class="img"
            :src="details[`image_url`]"
            ref="image_url"
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
        <delete-existense class="delete_button"></delete-existense>
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
import DeleteExistense from "@/components/deleteExistense.vue";
import EditProfileImage from "@/components/editProfileImage.vue";
export default {
  components: {
    PageHeader,
    EditProfile,
    DeleteExistense,
    EditProfileImage,
  },
  methods: {
    send_info() {
      this.details[`first_name`] = this.$refs[`first_name`][`value`];
      this.details[`last_name`] = this.$refs[`last_name`][`value`];
      this.details[`email`] = this.$refs[`email`][`value`];
      this.details[`username`] = this.$refs[`username`][`value`];
      this.details[`password`] = this.$refs[`password`][`value`];
      this.$root.$emit(`send_details`, this.details);
    },
  },
  mounted() {
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
         this.$root.$emit(`send_image_data`, this.details[`image_url`]);
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      details: undefined,
      show_edit: true,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  width:100%;
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
  .delete_button {
    align-self: end;
  }
}
.form_data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  .content_item {
    display: grid;
    margin-top: 40px;
    width: 100%;
    p {
      justify-self: start;
      margin: 10px 5px 5px 0px;
    }
    input {
      width: 100%;
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
    justify-self: end;
    grid-template-columns: 1fr 1fr;
    .edit_button{
        align-self: end;
    }

    .img {
      height: 70px;
      width: 70px;
      padding-right: 20px;
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

<template>
  <!-- profile page is for the profile of a client -->
  <!-- this component will show the profile of a client and show the profile related data in a form input fields -->
  <!-- this component will also emit the details from the form inputs -->
  <!-- the emitted data will be used to edit the profile -->
  <div>
    <div v-if="message !== undefined">{{ message }}</div>
    <div class="main_page">
      <page-header></page-header>
      <div class="form">
        <!-- the form header is the header for the form which will contain the images and other options as well -->
        <div class="form_header">
          <div>
            <h2>
              Welcome, {{ details[`first_name`] }} {{ details[`last_name`] }}
            </h2>
          </div>
          <div class="image">
            <img
              class="img"
              :src="details[`image_url`]"
              ref="image_url"
              :alt="`image of ${details[`first_name`]}`"
            />
            <!-- edit profile image is a component which is used to change the proifle image for a client  -->
            <edit-profile-image class="edit_button"></edit-profile-image>
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
            <input
              type="text"
              :value="`${details[`username`]}`"
              ref="username"
            />
          </div>
        </div>
        <!-- save button will trigger send info and which will emit the info grabbed from all the form values -->
        <button @click="send_info">Save</button>
        <!-- edit profile is a component which is here to make an api call after recieving all the data from this component by emitting -->
        <!-- edit profile component will just show a message on this page because everything is happening on the backend for edit profile -->
        <edit-profile></edit-profile>
        <!-- the form contains the delete existense component to delete the client account -->
        <delete-existense class="delete_button"></delete-existense>
        <change-password class="change_password" ></change-password>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import PageHeader from '@/components/pageHeader.vue'
import EditProfile from '@/components/editProfile.vue'
import DeleteExistense from '@/components/deleteExistense.vue'
import EditProfileImage from '@/components/editProfileImage.vue'
import ChangePassword from "@/components/changePassword.vue";
export default {
  components: {
    PageHeader,
    EditProfile,
    DeleteExistense,
    EditProfileImage,
    ChangePassword
  },
  methods: {
    send_info() {
      // send info method will emit the data from the forms to the edit profile component
      // edit profile component will use the data in the api call
      this.details[`first_name`] = this.$refs[`first_name`][`value`]
      this.details[`last_name`] = this.$refs[`last_name`][`value`]
      this.details[`email`] = this.$refs[`email`][`value`]
      this.details[`username`] = this.$refs[`username`][`value`]
      this.$root.$emit(`send_details`, this.details)
    },

    /*get info will call the api whenever asked for */
    get_info() {
      axios
        .request({
          // api endpoint to get information of client's profile
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          params: {
            client_id: cookies.get(`client_id`)
          },
        })
        .then((response) => {
          // there will be only one object in data array from response
          this.details = response[`data`][0]
        })
        .catch((error) => {
          if (error) {
            this.message = `There is an error while showing the user profile`
          }
        })
    },
  },
  mounted() {
    /*get info method will get called on mounting */
    this.get_info()
  },
  data() {
    return {
      details: undefined,
      show_edit: true,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.main_page {
  display: grid;
  place-items: center;
}
.form {
  display: grid;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  button {
    padding: 10px;
  }
  .delete_button {
    align-self: end;
  }
}
.form_data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .content_item {
    display: grid;
    margin-top: 10px;
    width: 100%;
    text-align: center;
    p {
      justify-self: start;
    }
    input {
      text-align: center;
      padding: 10px 0px;
      width: 100%;
      border: 1px solid black;
      background-color: #b0cad9;
    }
  }
}
.form_header {
  display: grid;
  width: 100%;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  div {
    align-items: center;
    h2 {
      display: grid;
      text-transform: capitalize;
    }
  }
  .image {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: end;
    .edit_button {
      display: grid;
      justify-items: start;
      align-self: end;
    }
    .img {
      height: 70px;
      width: 70px;
      object-fit: cover;
    }
  }
}
@media only screen and (min-width: 600px) {
  .form {
    width: 40vw;
    margin-top: 20px;
    gap: 20px;
  }
  .form_data {
    gap: 10px;
  }
}
</style>

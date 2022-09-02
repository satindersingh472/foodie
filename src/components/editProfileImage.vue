<template>
  <div>
    <!-- edit profile image is just for editing the profile image of a client -->
    <div>
      <div>
        <!-- edit will trigger the edit button method and show the div with input field -->
        <button @click="edit_button">edit</button>
        <!-- save button will send the request to change profile image -->
        <button v-if="edit_clicked === true" @click="send_request">Save</button>
      </div>
      <div v-if="edit_clicked === true">
        <p>Change picture</p>
        <input type="url" ref="image_url" />
      </div>

      <div v-if="message !== undefined">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    edit_button() {
      this.edit_clicked = true;
    },

    send_request() {
        this.edit_clicked = false;
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          method: `PATCH`,
          headers: {
            "x-api-key": `TVTZDiQZDzjkWqVkNCxr`,
            token: cookies.get(`token`),
          },
          data: {
            image_url: this.$refs[`image_url`][`value`],
          },
        })
        .then((response) => {
          if (response) {
            this.message = `change successfull`;
          }
        })
        .catch((error) => {
          if (error) {
            this.message = `error! in changing`;
          }
        });
        setTimeout(() => {
                    this.$router.push('/profile_page');
        }, 1000);
    },
  },
  data() {
    return {
      message: undefined,
      image_url: undefined,
      edit_clicked: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>

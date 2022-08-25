<template>
  <div>
    <div class="profile">
      <h2>Welcome, {{user[`first_name`]}}</h2>
      <h2>First Name:  {{user[`first_name`]}}</h2>
      <h2>Last Name:   {{user[`last_name`]}}</h2>
      <h2>User Name:   {{user[`username`]}}</h2>
      <h2>Email:   {{user[`email`]}}</h2>
      <img :src="user[`image_url`]" :alt="`image for ${user[`first_name`]}`"/>
    </div>
    <div v-if="show_edit !== undefined" class="edit_profile">
      <edit-profile></edit-profile>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditProfile from "@/components/editProfile.vue";
export default {
  components: {
    EditProfile
  },
  mounted () {
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
          this.user = response[`data`][0];
        })
        .catch((error) => {
          error;
        });
  },
  data() {
    return {
      user: [],
      show_edit: true
    };
  },
};
</script>

<style lang="scss" scoped></style>

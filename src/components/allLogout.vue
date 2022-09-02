<template>
<!-- if show component is not false then the following div will show up -->
  <div v-if="show_component !== false">
    <!-- at click will trigger delete token function -->
    <button @click="delete_token">LogOut</button>
  </div>
</template>

<script>
// cookies are imported
import cookies from "vue-cookies";
export default {
  methods: {
    // delete token method will check for client and restaurant cookies and delete whichever is present
    delete_token() {
      if (cookies.get(`client_id`)) {
        cookies.remove(`client_id`);
        cookies.remove(`token`);
        cookies.remove(`restaurant_number`);
        this.$router.push(`/`);
      } else if (cookies.get(`restaurant_id`)) {
        cookies.remove(`restaurant_id`);
        cookies.remove(`token`);
        this.$router.push(`/`);
      }
    },
  },
  mounted() {
    // show component will be true if
    // cookies token and client id are present or
    // cookies token and restaurant id are present
    if (
      cookies.get(`token`) &&
      (cookies.get(`client_id`) || cookies.get(`restaurant_id`))
    ) {
      this.show_component = true;
    }
  },
  data() {
    return {
        // by default show component is false i.e logout button will not get displayed
      show_component: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>

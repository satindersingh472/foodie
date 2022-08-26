<template>
  <div>
    <page-header></page-header>
    <div class="login_form">
      <p>Email</p>
      <input type="text" ref="email" />
      <p>Password</p>
      <input type="text" ref="password" />
      <button @click="login" >Log In</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "@/components/pageHeader.vue";
export default {
    components:{
        PageHeader
    },
  methods: {
    login() {
        this.email = this.$refs[`email`][`value`];
        this.password = this.$refs[`password`][`value`]
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-login`,
          method: `POST`,
          headers:{
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr'
          },
          data: {
            email: this.email,
            password: this.password
          },
        })
        .then((response) => {
          cookies.set(`client_id`, response[`data`][`client_id`]);
          cookies.set(`token`, response[`data`][`token`]); 
          this.$router.push(`/profile_page`);
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
        email: undefined,
        password: undefined
    }
  },
};
</script>

<style lang="scss" scoped></style>

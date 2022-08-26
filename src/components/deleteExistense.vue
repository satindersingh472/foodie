<template>
  <div>
    <button @click="delete_account" class="delete">Delete Account</button>
    <div v-if="show_input === true">
      <p>Enter Password</p>
      <input type="text" ref="password" />
      <button @click="confirm_delete">Delete</button>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    delete_account() {
      this.show_input = true;
    },
    confirm_delete() {
      axios
        .request({
          url: ` https://innotechfoodie.ml/api/client`,
          method:`DELETE`,
          headers:{
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`)
          },
          data:{
            password: this.$refs[`password`][`value`]
          }
        })
        .then((response) => {
          if(response){
            this.message = `Account  Deleted Successfuly`;
            this.$router.push(`/`);
          }
        })
        .catch((error) => {
          if(error){
            this.message = `Error! in Deleting Account`;
          }
        });
    },
  },
  data() {
    return {
      show_input: false,
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
.delete {
  background-color: red;
  color: white;
}
</style>

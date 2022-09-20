<template>
  <div>
    <!-- delete restaurant component is for deleting the account of a restaurant-->
    <!-- the delete button will display the div with password to enter and a button -->
    <button @click="delete_account" class="delete">Delete Account</button>
    <div v-if="show_input === true">
      <p>Enter Password</p>
      <input type="text" ref="password" />
      <!-- delete button will trigger the confirm delete method and call the api -->
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
    // delete account method will change the show input value and that will help show the div on page
    delete_account() {
      this.show_input = true;
    },
    // confirm delete method will call the api and delete the account with delete method
    confirm_delete() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant`,
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
            // if api response is successfull then the following msg will be shown
            cookies.remove(`token`);
            cookies.remove(`restaurant_id`);
            this.message = `Account  Deleted Successfuly`;
            // the user will be routed to the homepage 
            this.$router.push(`/`);
          }
        })
        .catch((error) => {
          if(error){
            // if error in deleting the account then there is an error message
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
  padding: 10px;
  border-radius: 10px;
}
</style>

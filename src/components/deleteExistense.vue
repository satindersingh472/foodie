<template>
  <div>
    <!-- this component is used to delete the client and when delete account button is pressed then delete account method will get triggerd -->
    <button @click="delete_account" class="delete">Delete Account</button>
    <!-- delete account method will set the show input equals to true and then the password div will get displayed
     because delete account api endpoint for client needs a password in a data object for api delete method -->
    <div v-if="show_input === true">
      <p>Enter Password</p>
      <input type="text" ref="password" />
      <!-- delete button will trigger confirm delete method and runs the api request  -->
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
    // delete account button clicked will make show input true and show the div
    delete_account() {
      this.show_input = true;
    },

  confirm_delete(){
    if(confirm('This will delete your account permanently..') === true){
      this.send_request()
    }
  },

    send_request() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method:`DELETE`,
          headers:{
            token: cookies.get(`token`)
          },
          data:{
            password: this.$refs[`password`][`value`]
          }
        })
        .then((response) => {
            // if account gets deleted then following message will appear
            this.message = response['data']
            cookies.remove(`token`);
            cookies.remove(`client_id`);
            this.message = `Account  Deleted Successfuly`;
            this.$router.push(`/`);
          
        })
        .catch((error) => {
          this.message = error['response']['data']
        });
    },
  },
  data() {
    return {
      // show input is false by default so that delete button will not accompany any div asking for password
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

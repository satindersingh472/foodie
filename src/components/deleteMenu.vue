<template>
  <div>
    <!-- delete item will delete the item from restaurant side 
    delete item button will trigger the delete detail method -->
    <button @click="delete_detail">Delete</button>
    <!-- if something happens after the api request then an appropriate message will be displayed here -->
    <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  // this component will expect the props with key of detail as an object 
  props: {
    detail: Object,
  },
  methods: {
    // delete detail method will call the confirm delete method
    delete_detail() {
      this.confirm_delete();
    },
    // confirm delete method will pop up the confirmation dialog box
    // if confirmed yes then it will trigger the send request method for an api call
    // if not confirmed then a message will appear for request cancelled
    confirm_delete() {
      this.warning =
        this.detail[`name`] + ` will get deleted.Would you like to proceed? `;
      if (confirm(this.warning)) {
        this.send_request();
      } else {
         this.message = `request cancelled`;
       setTimeout(() => {
        this.message = undefined
       }, 2000);
      }
    },
    send_request() {
      axios
        .request({
          url: "https://innotechfoodie.ml/api/menu",
          method: `DELETE`,
          headers: {
            "x-api-key": "TVTZDiQZDzjkWqVkNCxr",
            token: cookies.get(`token`),
          },
          data: {
            menu_id: this.detail[`id`],
          },
        })
        .then((response) => {
          if(response){
            // if deleted successfully than the following message value will be displayed after api gets response
            /*it will show this message and then after 2 seconds it will erase the message and emit the event
            to the parent element so that it will change the page */
            this.message = this.detail[`name`] + ` deleted successfully.`;
            setTimeout(() => {
              this.message = undefined;
              this.$emit(`recieve_delete_response`, response);
            }, 2000);
          }
        })
        .catch((error) => {
          if(error){
            // if there is an error in deleting then the following messsage will get displayed on the page.
            this.message = this.detail[`name`] + ` NOT deleted due to error`;
          }
        });
    },
  },
  data() {
    return {
      warning: undefined,
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
button{
  font-size: 1.3rem;
}

</style>

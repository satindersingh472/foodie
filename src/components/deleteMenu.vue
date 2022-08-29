<template>
  <div>
    <button @click="delete_detail">Delete Item</button>
    <h2 v-if="message !== undefined">{{message}}</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  props: {
    detail: Object,
  },
  methods: {
    delete_detail() {
      this.confirm_delete();
    },
    confirm_delete() {
      this.warning =
        this.detail[`name`] + ` will get deleted.Would you like to proceed? `;
      if (confirm(this.warning)) {
        this.send_request();
      } else {
        this.message = `request cancelled`;
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
            this.message = this.detail[`name`] + ` deleted successfully.`;
          }
        })
        .catch((error) => {
          if(error){
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

<style lang="scss" scoped></style>

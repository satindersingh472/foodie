<template>
  <div>
<button @click="get_details" >click me </button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
 methods: {
     get_details() {
    axios
      .request({
        url:`https://innotechfoodie.ml/api/client`,
        params:{ get_details() {
    axios
      .request({
        url:`https://innotechfoodie.ml/api/client`,
        headers:{
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr'
        },
        params:{
            client_id: cookies.get(`client_id`)
        }
      })
      .then((response) => {
        response;
      })
      .catch((error) => {
        error;
      });
  },
            client_id: cookies.get(`client_id`)
        }
      })
      .then((response) => {
        response;
      })
      .catch((error) => {
        error;
      });
  },
 },
};
</script>

<style lang="scss" scoped></style>

<template>
<div>
  <div>
    <button @click="get_details(details,$event)">Edit</button>
    <div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  props:{
    details: Object
  },
  methods: {
    get_details(details){
      this.information = details;
      this.make_changes(details);
    },
    make_changes(details) {
      this.change_item = details
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          method: `PATCH`,
          headers: {
            'x-api-key': `TVTZDiQZDzjkWqVkNCxr`,
            token: cookies.get(`token`)
          },
          data:{ 
          }
        })
        .then((response) => {
          this.message = response;
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
      information: undefined,
      change_item: undefined
    };
  },
};
</script>

<style lang="scss" scoped></style>

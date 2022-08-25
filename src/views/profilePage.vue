<template>
  <div>
    <page-header></page-header>
    <div class="form">
      <div class="form_header">
        <div class="info_header">
          <h2>Profile</h2>
        </div>
        <div class="options_header">
          <h2>Delete</h2>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "@/components/pageHeader.vue";
export default {
  components: {
    PageHeader,
  },
  mounted() {
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
        this.details = response[`data`][0];
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      details: [],
      show_edit: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.form{
    width: 70vw;
    display: grid;
    place-items: center;
}
.form_header{
    display: grid;
    grid-template-columns: 1fr 1fr;
    .info_header{

    }
    .options_header{

    }
}
</style>

<template>
  <div v-if="detail !== undefined">
    <h4>Name: <input type="text" ref="name" :value="`${detail[`name`]}`" /></h4>
    <h4>
      Decription:
      <input
        type="text"
        ref="description"
        :value="`${detail[`description`]}`"
      />
    </h4>
    <h4>
      Price: <input type="text" ref="price" :value="`${detail[`price`]}`" />
    </h4>
    <h4>
      Image URL:
      <input type="url" ref="image_url" :value="`${detail[`image_url`]}`" />
    </h4>
    <button @click="send_request">save</button>
    <h2 v-if="message !== undefined" >
        {{message}}
    </h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  mounted() {
    this.$root.$on(`recieve_edit`, this.store_changes);
  },
  methods: {
    store_changes(detail) {
      this.detail = detail;
    },

    send_request() {
      axios
        .request({
          url: ` https://innotechfoodie.ml/api/menu`,
          method: `PATCH`,
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`),
          },
          data:{
            menu_id: this.detail[`id`],
            decription: this.$refs[`description`][`value`],
            image_url: this.$refs[`image_url`][`value`],
            name: this.$refs[`name`][`value`],
            price:this.$refs[`price`][`value`]
          }
        })
        .then((response) => {
          if(response){
            this.message = `changes applied`;
          }
        })
        .catch((error) => {
          if(error){
            this.message = `changes NOT applied`;
          }
        });
    },
  },
  data() {
    return {
      detail: undefined,
      data: undefined,
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped></style>

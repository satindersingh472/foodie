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
    <div class="form"></div>
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
            menu_id: this.detail[`id`],
          },
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
      detail: undefined,
      data: undefined,
    };
  },
};
</script>

<style lang="scss" scoped></style>

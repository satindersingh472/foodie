<template>
  <div></div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/client-order`,
        headers: {
          'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
          token: cookies.get(`token`),
        },
        params: {
          is_confirmed: `true`,
        },
      })
      .then((response) => {
        response
      })
      .catch((error) => {
        error
      })
  },
}
</script>

<style lang="scss" scoped></style>

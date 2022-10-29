<template>
  <!-- if show component is not false then the following div will show up -->
  <div v-if="show_component !== false">
    <!-- at click will trigger delete token function -->
    <button @click="send_request">LogOut</button>
    <div  v-if="message !== undefined" >{{message}}</div>
  </div>
</template>

<script>
import axios from 'axios'
// cookies are imported
import cookies from 'vue-cookies'
export default {
  methods: {
    // delete token method will check for client and restaurant cookies and delete whichever is present
    delete_token() {
      if (cookies.get(`client_id`)) {
        cookies.remove(`client_id`)
        cookies.remove(`token`)
        cookies.remove(`restaurant_selected`)
        this.$router.push(`/`)
      } else if (cookies.get(`restaurant_id`)) {
        cookies.remove(`restaurant_id`)
        cookies.remove(`token`)
        this.$router.push(`/`)
      }
    },
    send_request() {
      axios
        .request({
          url: this.url_value,
          method: 'DELETE',
          headers: {
            token: cookies.get('token')
          }
        })
        .then((response) => {
          this.delete_token()
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
  },
  mounted() {
    if(cookies.get('client_id')){
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/client_login`
    } else if (cookies.get('restaurant_id')){
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant_login`
    }

    // show component will be true if
    // cookies token and client id are present or
    // cookies token and restaurant id are present
    if (
      cookies.get(`token`) &&
      (cookies.get(`client_id`) || cookies.get(`restaurant_id`))
    ) {
      this.show_component = true
    }
  },
  data() {
    return {
      // by default show component is false i.e logout button will not get displayed
      show_component: false,
      url_value: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>

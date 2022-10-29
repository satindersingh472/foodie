<template>
  <div>
    <div class="button_container">
        <div class="button">
            <button class="change_password">
                Change password
            </button>
        </div>
        <div v-if="show_input === true" class="container">
            <input type="text" ref = 'password' placeholder="enter the new password">
            <button class="save">Save</button>
            <button class="close">Close</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    show_hide_input(){
        if(show_input === false)
    },


    send_request() {
      axios
        .request({ 
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
            method: `PATCH`,
            headers: {
                token: cookies.get('token')
            },
            data:{
                password: this.$refs['password']['value']
            }
        })
        .then((response) => {
          response
        })
        .catch((error) => {
          error
        })
    },
  },
  data() {
    return {
        show_input: false
    }
  },
}
</script>

<style lang="scss" scoped></style>

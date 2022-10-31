<template>
  <div>
    <div class="button_container">
        <div  v-if="show_input === false" class="button_change_password">
            <button @click="show_hide_input" class="button">
                Change password
            </button>
        </div>
        <div v-if="show_input === true" class="container">
            <input type="text" ref = 'password' placeholder="enter the new password">
            <div class="save_close">
            <button @click="send_request" class="save">Save</button>
            <button @click="show_hide_input" class="close">Close</button>
            </div>
            <p v-if="message !== undefined">{{message}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  mounted () {
    if(cookies.get('client_id')){
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/client`
    } else if (cookies.get('restaurant_id')){
      this.url_value = `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant`
    }
  },
  methods: {
    show_hide_input(){
        if(this.show_input === false){
          this.show_input = true
        } else {
          this.show_input = false
        }
    },


    send_request() {
      axios
        .request({ 
            url: this.url_value,
            method: `PATCH`,
            headers: {
                token: cookies.get('token')
            },
            data:{
                password: this.$refs['password']['value']
            }
        })
        .then((response) => {
          this.message = response['data']
          setTimeout(() => {
            this.message = undefined
            this.show_input = false
          }, 2000);
        })
        .catch((error) => {
          this.message = error['response']['data']
        })
    },
  },
  data() {
    return {
      url_value: undefined,
        show_input: false,
        message: undefined
    }
  },
}
</script>

<style lang="scss" scoped>
*{
  padding: 0px;
  margin: 0px;
}
.button_change_password{
  .button{
    padding: 5px;
  }
}
.container{
  display: grid;
  gap: 10px;
  justify-items: start;
  input[type=text]{
    padding: 10px;
    background-color: #b0cad9;
  }
  .save_close{
    display: grid;
    gap: 10px;
  }
}


</style>

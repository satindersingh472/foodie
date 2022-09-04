<template>
  <div class="main_header">
    <div class="navbar">
      <div class="logo">
        <img class="icon" src="@/assets/logo.svg" alt="logo for foodie">
        <h4>Foodie</h4>
      </div>
      <div class="button_open">
        <button>
          <img
            @click="show_links"
            class="icon"
            src="@/assets/menu_icon_open.svg"
            alt="icon to open menu"
          />
        </button>
      </div>
    </div>
    <div v-if="show_links_all === true" class="links">
      <div class="button_close">
        <button>
          <img
            @click="hide_links"
            src="@/assets/menu_icon_close.svg"
            alt="close_menu_icon"
          />
        </button>
      </div>
      <router-link to="/profile_page">Profile</router-link>
      <router-link to="/discover_restaurants">Restaurants</router-link>
      <router-link to="/all_orders">Orders</router-link>
      <router-link to="/client_cart">Cart</router-link>
      <router-link v-if="cookies_exist === false" to="/client_login"
        >LogIn</router-link
      >
      <all-logout v-if="cookies_exist === true"></all-logout>
    </div>
  </div>
</template>

<script>
import AllLogout from "@/components/allLogout.vue";
import cookies from "vue-cookies";
export default {
  components: {
    AllLogout,
  },
  mounted() {
    if (cookies.get(`client_id`)) {
      this.cookies_exist = true;
    } else {
      this.cookies_exist = false;
    }
  },
  methods: {
    show_links() {
      this.show_links_all = true;
    },
    hide_links() {
      this.show_links_all = false;
    },
  },
  data() {
    return {
      cookies_exist: undefined,
      show_links_all: false,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
.main_header {
  display: grid;
  width: 100%;
  .navbar {
    display: grid;
    grid-auto-flow: column;
    height: 10vh;
    align-items:center;
    background-color: #b0cad8;
    .logo{
        display: grid;
        justify-items: start;
        h4{
            font-family: gluten,sans-serif;
        }
    }
    .button_open {
      display: grid;
      justify-items: end;
      button {
        background-color: transparent;
        border: none;
      }
    }
  }
}
.links {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  justify-items: center;
  background-color: white;
  position: fixed;
  right: 0px;
  top: 0px;
  height: 100vh;
  width: 50%;

  .button_close {
    display: grid;
    justify-self: end;
    button {
      background-color: transparent;
      border: none;
      height: 40px;
      display: grid;
      padding: 15px;
      img {
        height: 40px;
        width: 40px;
      }
    }
  }
  * {
    text-decoration: none;
    color: black;
  }
}
.icon {
  width: 40px;
  padding-left:10px;
}
</style>

<template>
<!-- this component will contain mobile links for client side -->
  <div class="main_header">
    <div class="navbar">
      <div class="logo">
        <img class="icon" src="@/assets/logo.svg" alt="logo for foodie">
        <h4>Foodie</h4>
      </div>
      <div class="button_open">
        <!-- the following button is an image to display the minimize navigation links -->
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
        <!-- the following button will help to close the navigation links upon open -->
        <button>
          <img
            @click="hide_links"
            src="@/assets/menu_icon_close.svg"
            alt="close_menu_icon"
          />
        </button>
      </div>
      <!-- the following links will get displayed on the mobile navbar for client side -->
      <router-link to="/profile_page">Profile</router-link>
      <router-link to="/discover_restaurants">Restaurants</router-link>
      <router-link to="/display_orders">Orders</router-link>
      <router-link to="/client_cart">Cart</router-link>
      <all-logout></all-logout>
    </div>
  </div>
</template>

<script>
import AllLogout from "@/components/allLogout.vue";
export default {
  components: {
    AllLogout,
  },

  methods: {
    /*show links will help show the navigation links upon clicking the button open */
    show_links() {
      this.show_links_all = true;
    },
    /*hide links will hide the navigation links upon clicking the button close */
    hide_links() {
      this.show_links_all = false;
    },
  },
  data() {
    return {
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

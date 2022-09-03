<template>
  <div class="main_header">
    <div class="navbar">
      profile
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
      <router-link to="/profile_page">Profile</router-link>
      <router-link to="/discover_restaurants">Restaurants</router-link>
      <router-link to="/order_placed">Orders</router-link>
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
      if (this.show_links_all === false) {
        this.show_links_all = true;
      } else {
        this.show_links_all = false;
      }
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
.main_header {
  display: grid;
  width: 100%;
  .navbar {
    display: grid;
    grid-auto-flow: column;
    height: 10vh;
    align-items: center;
    .button_open {
      display: grid;
      justify-items: end;
    }
  }
}
.links {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  place-items: center;
  background-color: white;
  position: fixed;
  right: 0px;
  top: 10vh;
  height: 100vh;
  width: 100%;
*{
    text-decoration: none;
}
}
.icon {
  height: 40px;
  width: 40px;
}
.button_open {
  button {
    background-color: transparent;
    border: none;
  }
}
</style>

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/homePage.vue";
import ClientSignUp from "@/views/clientSignUp.vue";
import RestaurantSignUp from "@/views/restaurantSignUp.vue";
import ProfilePage from "@/views/profilePage.vue";
import ClientLogin from "@/views/clientLogin.vue";
import RestaurantLogin from "@/views/restaurantLogin.vue";
import RestaurantProfile from "@/views/restaurantProfile.vue";
import DiscoverRestaurants from "@/views/discoverRestaurants.vue";
import RestMenuProfile from "@/views/restMenuProfile.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component:HomePage
  },
  {
    path:`/client_sign_up`,
    component: ClientSignUp
  },
  {
    path: `/restaurant_sign_up`,
    component: RestaurantSignUp
  },
  {
    path: `/profile_page`,
    component: ProfilePage
  },
  {
    path: `/client_login`,
    component: ClientLogin
  },
  {
    path: `/restaurant_login`,
    component: RestaurantLogin
  },
  {
    path: `/restaurant_profile`,
    component: RestaurantProfile
  },
  {
    path: `/discover_restaurants`,
    component: DiscoverRestaurants
  },
  {
    path: `/rest_menu_profile`,
    component: RestMenuProfile
  }

]

const router = new VueRouter({
  routes
})

export default router
